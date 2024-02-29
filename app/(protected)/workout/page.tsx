import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import PageHeading from "@/components/PageHeading/PageHeading";
import RoutineCards from "./_components/RoutineCards";
import { WorkoutPlan } from "@prisma/client";

type Exercise = {
  id: string;
  name: string;
  category: string;
};

type WorkoutPlanExercise = {
  Exercise: Exercise;
  order: number | null;
  sets: number;
};

type ExtendedWorkoutPlan = WorkoutPlan & {
  WorkoutPlanExercise: WorkoutPlanExercise[];
};

export default async function WorkoutPage() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const whereClause: Prisma.WorkoutPlanWhereInput[] = [
    { isSystemRoutine: true },
  ];

  if (userId && typeof userId === "string") {
    whereClause.push({
      userId: userId,
    });
  }

  const routines: ExtendedWorkoutPlan[] = await prisma.workoutPlan.findMany({
    where: {
      OR: whereClause,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      WorkoutPlanExercise: {
        select: {
          sets: true,
          reps: true,
          exerciseDuration: true,
          order: true,
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

  const userRoutines = routines.filter((routine) => !routine.isSystemRoutine);
  const systemRoutines = routines.filter((routine) => routine.isSystemRoutine);

  return (
    <>
      <div className="flex gap-x-4 items-center justify-between">
        <PageHeading title="Start Workout" />
        <Button
          as={Link}
          href="/edit-routine/step-1"
          color="primary"
          className="gap-unit-1 mb-3"
        >
          <IconPlus size={16} />
          New Routine
        </Button>
      </div>

      <h4 className="font-semibold text-2xl my-3">Your Workout Plans</h4>
      <RoutineCards routines={userRoutines} isSystem={false} />

      <h4 className="font-semibold text-2xl mb-3 mt-10">System Workout Plans</h4>
      <RoutineCards routines={systemRoutines} isSystem={true} />
    </>
  );
}
