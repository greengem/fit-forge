import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
import WorkoutManager from "./_components/WorkoutManager";
import WorkoutManagerV2 from "./_components/WorkoutManagerV2";

async function fetchRoutine(id: string) {
  return await prisma.workoutPlan.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      notes: true,
      WorkoutPlanExercise: {
        select: {
          Exercise: {
            select: {
              id: true,
              name: true,
            },
          },
          sets: true,
          reps: true,
          exerciseDuration: true,
          trackingType: true,
          order: true,
        },
      },
    },
  });
}

export default async function StartWorkout({
  params,
}: {
  params: { id: string };
}) {
  const workout = await fetchRoutine(params.id);

  if (!workout) {
    throw new Error("Workout not found");
  }

  return (
    <>
      <PageHeading title={`Workout: ${workout.name}`} />
      <WorkoutManager workout={workout} />
    </>
  );
}
