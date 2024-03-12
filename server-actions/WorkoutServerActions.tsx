"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
import { TrackingType } from "@prisma/client";

interface Set {
  reps: number | null;
  weight: number | null;
  duration: number | null;
  completed: boolean;
}

interface Exercise {
  exerciseId: string;
  trackingType: TrackingType;
  sets: Set[];
}

interface WorkoutData {
  date: string;
  duration: number;
  workoutPlanId: string;
  exercises: Exercise[];
}

export async function handleSaveWorkout(data: WorkoutData) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const { workoutPlanId, date, duration, exercises } = data;

    await prisma.workoutLog.create({
      data: {
        userId: userId,
        workoutPlanId: workoutPlanId,
        date: new Date(date),
        duration: duration,
        inProgress: false,
        exercises: {
          create: exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            trackingType: exercise.trackingType,
            sets: {
              create: exercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps,
                exerciseDuration: set.duration,
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/activity");

    return { success: true, message: "Workout Saved" };
  } catch (e) {
    return { success: false, message: "Failed to save workout" };
  }
}

export async function handleUpdateWorkout(id: string, data: WorkoutData) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const { workoutPlanId, date, duration, exercises } = data;

    await prisma.workoutLog.update({
      where: { id: id },
      data: {
        userId: userId,
        workoutPlanId: workoutPlanId,
        date: new Date(date),
        duration: duration,
        inProgress: false,
        exercises: {
          deleteMany: {},
          create: exercises.map((exercise) => ({
            exerciseId: exercise.exerciseId,
            trackingType: exercise.trackingType,
            sets: {
              create: exercise.sets.map((set) => ({
                weight: set.weight,
                reps: set.reps,
                exerciseDuration: set.duration,
              })),
            },
          })),
        },
      },
    });

    revalidatePath("/activity");

    return { success: true, message: "Workout Updated" };
  } catch (e) {
    return { success: false, message: "Failed to update workout" };
  }
}
