import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const exercises = await prisma.exercise.findMany({
      where: {
        favouritedBy: {
          some: {
            userId: userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
      },
    });

    return Response.json(exercises);
  } catch (error) {
    return { error: (error as Error).message };
  }
}
