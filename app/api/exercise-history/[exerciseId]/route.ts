import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";

export async function GET(
  request: Request,
  { params }: { params: { exerciseId: string } },
) {
  try {
    const { userId }: { userId: string | null } = await auth();
    const { exerciseId } = params;

    if (!userId) {
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
      });
    }

    const history = await prisma.workoutLog.findMany({
      where: {
        userId: userId,
        exercises: {
          some: {
            exerciseId: exerciseId,
          },
        },
      },
      include: {
        exercises: {
          where: {
            exerciseId: exerciseId,
          },
          include: {
            sets: true,
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    });

    return new Response(JSON.stringify(history), { status: 200 });
  } catch (error) {
    console.error("Error details:", error);
    return new Response(
      JSON.stringify({ error: "Error fetching exercise history" }),
      { status: 500 },
    );
  }
}
