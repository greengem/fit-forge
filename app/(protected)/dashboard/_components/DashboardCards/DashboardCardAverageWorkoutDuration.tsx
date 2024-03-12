import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import DashboardCardTemplate from "./DashboardCardTemplate";
import { subDays } from "date-fns";
import { IconHourglass } from "@tabler/icons-react";

export default async function DashboardCardAverageWorkoutDuration() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const thirtyDaysAgo = subDays(new Date(), 30);
  const workouts = await prisma.workoutLog.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: thirtyDaysAgo,
      },
    },
    select: {
      duration: true,
    },
  });

  const totalDuration = workouts.reduce(
    (total, workout) => total + workout.duration / 60,
    0,
  );
  const averageDuration =
    workouts.length > 0 ? Math.round(totalDuration / workouts.length) : 0;

  return (
    <DashboardCardTemplate
      title="Avg Workout Time"
      icon={<IconHourglass className="text-danger" />}
    >
      {averageDuration}
    </DashboardCardTemplate>
  );
}
