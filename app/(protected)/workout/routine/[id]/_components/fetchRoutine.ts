import prisma from "@/prisma/prisma";

export async function fetchRoutine(routineId: string) {
  if (routineId !== "new") {
    const existingRoutine = await prisma.workoutPlan.findUnique({
      where: { id: routineId },
      select: {
        id: true,
        name: true,
        notes: true,
        createdAt: true,
        updatedAt: true,
        WorkoutPlanExercise: {
          select: {
            sets: true,
            reps: true,
            exerciseDuration: true,
            order: true,
            trackingType: true,
            Exercise: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return existingRoutine;
  } else {
    return null;
  }
}
