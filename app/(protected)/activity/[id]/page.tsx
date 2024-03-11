import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import EditWorkout from "./EditWorkout";
import PageHeading from "@/components/PageHeading/PageHeading";

export default async function EditActivity({
  params,
}: {
  params: { id: string };
}) {
  const { userId }: { userId: string | null } = auth();
  const workoutId = params.id;

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  if (!workoutId) {
    throw new Error("You must provide a workout id.");
  }

  const workout = await prisma.workoutLog.findUnique({
    where: {
      id: workoutId,
    },
    select: {
      id: true,
      duration: true,
      date: true,
      WorkoutPlan: {
        select: {
          name: true,
          id: true,
        },
      },
      exercises: {
        select: {
          id: true,
          exerciseId: true,
          trackingType: true,
          Exercise: {
            select: {
              name: true,
            },
          },
          sets: {
            select: {
              weight: true,
              reps: true,
              exerciseDuration: true,
            },
          },
        },
      },
    },
  });

  if (!workout) {
    throw new Error("No workout found.");
  }

  return (
    <>
      <PageHeading title="Edit Workout" />
      <EditWorkout workout={workout} />
    </>
  );
}
