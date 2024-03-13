import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
//import StepProgress from "../_components/StepProgress";
import RoutineBuilder from "./_components/RoutineBuilder";

export default async function NewRoutineFormStepTwo({
  searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const routineId = searchParams?.id || "";

  const routine = await prisma.workoutPlan.findUnique({
    where: {
      id: routineId,
    },
    include: {
      WorkoutPlanExercise: {
        include: {
          Exercise: true,
        },
      },
    },
  });

  if (!routine) {
    throw new Error("No Routine found.");
  }

  return (
    <>
      <PageHeading title="New Routine - Step 3" />
      <p className="mb-3 text-zinc-600 dark:text-zinc-400 text-sm">
        You&apos;re almost there! Now, select how you want to track each
        exercise: by repetitions or duration. Then, arrange the exercises in
        your preferred order. For each exercise, specify the number of reps or
        the duration (in minutes or seconds) and the sets you aim to complete.
      </p>
      <RoutineBuilder routine={routine} />
    </>
  );
}
