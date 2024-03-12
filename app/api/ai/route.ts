
import { experimental_AssistantResponse } from "ai";
import OpenAI from "openai";

interface MessageContentText {
  type: "text";
  text: {
    value: string;
    annotations?: any[];
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: Request) {
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();

  const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: input.message,
  });

  return experimental_AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ threadId, sendMessage }) => {
      const run = await openai.beta.threads.runs.create(threadId, {
        assistant_id:
          process.env.ASSISTANT_ID ??
          (() => {
            throw new Error("ASSISTANT_ID is not set");
          })(),
      });

      async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
        while (run.status === "queued" || run.status === "in_progress") {
          await new Promise((resolve) => setTimeout(resolve, 500));
          run = await openai.beta.threads.runs.retrieve(threadId, run.id);
        }

        if (run.status !== "completed") {
          throw new Error(`Run did not complete successfully: ${run.status}`);
        }
      }

      await waitForRun(run);

      const responseMessages = (
        await openai.beta.threads.messages.list(threadId, { order: "asc" })
      ).data;

      for (const message of responseMessages) {
        sendMessage({
          id: message.id,
          role: "assistant",
          content: message.content.filter(
            (content) => content.type === "text",
          ) as any[],
        });
      }
    },
  );
}
