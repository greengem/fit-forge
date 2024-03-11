"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { TrackingType } from "@prisma/client";

export async function handleToggleFavouriteExercise(exerciseId: string) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const favouriteExercise = await prisma.favouriteExercise.findUnique({
    where: {
      userId_exerciseId: {
        userId: userId,
        exerciseId: exerciseId,
      },
    },
  });

  if (favouriteExercise) {
    await prisma.favouriteExercise.delete({
      where: {
        userId_exerciseId: {
          userId: userId,
          exerciseId: exerciseId,
        },
      },
    });
  } else {
    await prisma.favouriteExercise.create({
      data: {
        exerciseId,
        userId: userId,
      },
    });
  }

  revalidatePath("/exercises");
}

interface NewRoutineFromExercise {
  routineName: string;
  exerciseId: string;
  sets: string;
  reps?: string;
  duration?: string;
  trackingType: TrackingType;
}

export async function handleAddExerciseToNewRoutine(
  data: NewRoutineFromExercise,
) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const { routineName, exerciseId, sets, trackingType } = data;

    const reps =
      trackingType === TrackingType.reps ? parseInt(data.reps || "0") : null;
    const duration =
      trackingType === TrackingType.duration
        ? parseInt(data.duration || "0")
        : null;

    const newWorkoutPlan = await prisma.workoutPlan.create({
      data: {
        name: routineName,
        userId: userId,
      },
    });

    await prisma.workoutPlanExercise.create({
      data: {
        workoutPlanId: newWorkoutPlan.id,
        exerciseId: exerciseId,
        sets: parseInt(sets || "0"),
        reps: reps,
        exerciseDuration: duration,
        order: 1,
        trackingType: trackingType,
      },
    });

    revalidatePath("/exercises");

    return { success: true, message: "New routine created" };
  } catch (e) {
    return { success: false, message: "Failed to create new routine" };
  }
}

interface UpdateRoutineFromExercise {
  routineId: string;
  exerciseId: string;
  sets: string;
  reps?: string;
  duration?: string;
  trackingType: TrackingType;
}

export async function handleAddExerciseToExistingRoutine(
  data: UpdateRoutineFromExercise,
) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const { routineId, exerciseId, sets, trackingType } = data;

    const reps =
      trackingType === TrackingType.reps ? parseInt(data.reps || "0") : null;
    const duration =
      trackingType === TrackingType.duration
        ? parseInt(data.duration || "0")
        : null;

    const existingExercises = await prisma.workoutPlanExercise.findMany({
      where: {
        workoutPlanId: routineId,
      },
      orderBy: {
        order: "desc",
      },
      take: 1,
    });

    const order =
      existingExercises.length > 0 && existingExercises[0].order !== null
        ? existingExercises[0].order + 1
        : 1;

    await prisma.workoutPlanExercise.create({
      data: {
        workoutPlanId: routineId,
        exerciseId: exerciseId,
        sets: parseInt(sets || "0"),
        reps: reps,
        exerciseDuration: duration,
        order: order,
        trackingType: trackingType,
      },
    });

    revalidatePath("/exercises");

    return { success: true, message: "Exercise added to existing routine" };
  } catch (e) {
    return {
      success: false,
      message: "Failed to add exercise to existing routine",
    };
  }
}
