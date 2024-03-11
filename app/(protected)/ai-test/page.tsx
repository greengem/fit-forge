"use client";
import { checkRole } from "@/utils/roles";
import { Message, experimental_useAssistant as useAssistant } from "ai/react";
import { useEffect, useRef } from "react";

if (!checkRole("admin")) {
  throw new Error("Unauthorized");
}

const roleToColorMap: Record<Message["role"], string> = {
  system: "red",
  user: "yellow",
  assistant: "green",
  data: "orange",
  function: "gray",
  tool: "gray",
};

export default function Chat() {
  const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "/api/ai",
    });

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (status === "awaiting_message") {
      inputRef.current?.focus();
    }
  }, [status]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {error != null && (
        <div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
          <span className="block sm:inline">
            Error: {(error as any).toString()}
          </span>
        </div>
      )}

      {messages.map((m: Message) => (
        <div
          key={m.id}
          className="whitespace-pre-wrap"
          style={{ color: roleToColorMap[m.role] }}
        >
          <strong>{`${m.role}: `}</strong>
          {m.content}
          <br />
          <br />
        </div>
      ))}

      {status === "in_progress" && (
        <div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
      )}

      <form onSubmit={submitMessage}>
        <input
          ref={inputRef}
          disabled={status !== "awaiting_message"}
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Tell me your fitness goal, e.g., 'I want to lose belly fat'" // Updated placeholder
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
