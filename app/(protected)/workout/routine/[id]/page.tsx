import { auth } from "@clerk/nextjs";
import PageHeading from "@/components/PageHeading/PageHeading";
import RoutineBuilder from "./_components/RoutineBuilder";
import prisma from "@/prisma/prisma";

type FavoriteExercise = {
  exerciseId: string;
};

type Exercise = {
  id: string;
  name: string;
  category: string;
};

type WorkoutPlanExercise = {
  sets: number;
  reps: number | null;
  exerciseDuration: number | null;
  order: number;
  trackingType: string;
  Exercise: Exercise;
};

type ExistingRoutine = {
  id: string;
  name: string;
  notes: string | null;
  userId: string | null;
  createdAt: Date;
  updatedAt: Date;
  isSystemRoutine: boolean;
  systemRoutineCategory: string | null;
  WorkoutPlanExercise: WorkoutPlanExercise[];
} | null;

let existingRoutine: ExistingRoutine;

export default async function NewRoutinePage({
  params,
}: {
  params: { id: string };
}) {
  const routineId = params.id;
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  if (routineId !== "new") {
    existingRoutine = await prisma.workoutPlan.findUnique({
      where: { id: routineId },
      select: {
        id: true,
        name: true,
        notes: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        isSystemRoutine: true,
        systemRoutineCategory: true,
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
                category: true,
              },
            },
          },
        },
      },
    });

    if (!existingRoutine) {
      throw new Error("Invalid routine ID.");
    }
  } else {
    existingRoutine = null;
  }

  const favoriteExercises: FavoriteExercise[] =
    await prisma.favouriteExercise.findMany({
      where: {
        userId: userId,
      },
      select: {
        exerciseId: true,
      },
    });

  return (
    <>
      <PageHeading
        title={
          existingRoutine
            ? `Edit ${existingRoutine.name}`
            : "Create New Routine"
        }
      />
      <RoutineBuilder
        existingRoutine={existingRoutine}
        routineId={routineId}
        favoriteExercises={favoriteExercises}
      />
    </>
  );
}
