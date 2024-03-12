"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function handleDeleteRoutine(routineId: string) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    await prisma.workoutPlan.delete({
      where: {
        id: routineId,
      },
    });

    revalidatePath("/workout");

    return { success: true, message: "Routine deleted successfully" };
  } catch (e) {
    return { success: false, message: "Failed to delete routine" };
  }
}

export async function handleCreateRoutine(data: any) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const { routineName, exercisesWithOrder, notes } = data;

    await prisma.workoutPlan.create({
      data: {
        name: routineName,
        userId: userId,
        notes: notes,
        WorkoutPlanExercise: {
          create: exercisesWithOrder.map((exercise: any) => ({
            exerciseId: exercise.exerciseId,
            sets: exercise.sets,
            trackingType: exercise.trackingType,
            reps: exercise.reps,
            exerciseDuration: exercise.exerciseDuration,
            order: exercise.order,
          })),
        },
      },
    });

    revalidatePath("/workout");

    return { success: true, message: "Routine created successfully" };
  } catch (e) {
    return { success: false, message: "Failed to create routine" };
  }
}

export async function handleEditRoutine(data: any) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const { routineName, routineId, exercisesWithOrder, notes } = data;

    // First, update the workout plan details
    await prisma.workoutPlan.update({
      where: { id: routineId },
      data: {
        name: routineName,
        userId: userId,
        notes: notes,
      },
    });

    // Then, delete the existing exercises for the routine
    await prisma.workoutPlanExercise.deleteMany({
      where: { workoutPlanId: routineId },
    });

    // Finally, create the new exercises
    for (const exercise of exercisesWithOrder) {
      await prisma.workoutPlanExercise.create({
        data: {
          workoutPlanId: routineId,
          exerciseId: exercise.exerciseId,
          trackingType: exercise.trackingType,
          sets: exercise.sets,
          reps: exercise.reps,
          exerciseDuration: exercise.exerciseDuration,
          order: exercise.order,
        },
      });
    }

    revalidatePath("/workout");

    return { success: true, message: "Routine edited successfully" };
  } catch (e) {
    return { success: false, message: "Failed to edit routine" };
  }
}

export async function handleCreateRoutineStepOne(
  data: FormData,
  routineId: string | null,
) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const routineName = data.get("routineName") as string;
    const routineNotes = data.get("routineNotes") as string | null;

    let routine;
    if (routineId) {
      routine = await prisma.workoutPlan.update({
        where: { id: routineId },
        data: {
          name: routineName,
          notes: routineNotes,
        },
      });
    } else {
      routine = await prisma.workoutPlan.create({
        data: {
          name: routineName,
          userId: userId,
          notes: routineNotes,
        },
      });
    }

    revalidatePath("/workout");

    return {
      success: true,
      message: "Routine created successfully",
      newRoutineId: routine.id,
    };
  } catch (e) {
    return { success: false, message: "Failed to create routine" };
  }
}

export async function handleAddExerciseToRoutine({
  exerciseId,
  routineId,
}: {
  exerciseId: string;
  routineId: string;
}) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    await prisma.workoutPlan.update({
      where: {
        id: routineId,
      },
      data: {
        WorkoutPlanExercise: {
          create: {
            exerciseId: exerciseId,
            sets: 1,
            trackingType: "reps",
            reps: 8,
            exerciseDuration: null,
            //order: 1,
          },
        },
      },
    });

    revalidatePath("/workout");

    return { success: true, message: "Exercise added to routine successfully" };
  } catch (e) {
    return { success: false, message: "Failed to create routine" };
  }
}

export async function handleRemoveExerciseFromRoutine({
  exerciseId,
  routineId,
}: {
  exerciseId: string;
  routineId: string;
}) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    await prisma.workoutPlanExercise.deleteMany({
      where: {
        workoutPlanId: routineId,
        exerciseId: exerciseId,
      },
    });

    revalidatePath("/workout");

    return {
      success: true,
      message: "Exercise removed from routine successfully",
    };
  } catch (e) {
    return {
      success: false,
      message: "Failed to remove exercise from routine",
    };
  }
}
