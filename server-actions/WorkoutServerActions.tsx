"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

interface Set {
  reps: number | null;
  weight: number | null;
  duration: number | null;
  completed: boolean;
}

interface Exercise {
  exerciseId: string;
  sets: Set[];
}

interface WorkoutData {
  name: string;
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
    console.error(e);
    return { success: false, message: "Failed to save workout" };
  }
}




export async function handleSaveWorkoutV2(data: any) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    console.log(JSON.stringify(data, null, 2));

    const workoutLog = await prisma.workoutLog.create({
      data: {
        userId,
        workoutPlanId: data.workoutPlanId,
        date: new Date(),
        duration: data.duration,
        exercises: {
          create: Object.entries(data.exercises).map(([exerciseId, exerciseData]) => ({
            exerciseId,
            sets: {
              create: (exerciseData as { sets: Array<{ weight: string, reps: string }> }).sets.map((set: any) => ({
                weight: parseFloat(set.weight),
                reps: set.reps ? parseInt(set.reps) : null,
                exerciseDuration: set.exerciseDuration ? parseInt(set.exerciseDuration) : null,
              })),
            },
          })),
        },
      },
    });

    return { success: true, message: "Workout Saved" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "Failed to save workout" };
  }
}