// DashboardCardWeeklyWorkouts.tsx
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import DashboardCardTemplate from "./DashboardCardTemplate";
import { IconCalendarWeek } from "@tabler/icons-react";

export default async function DashboardCardWeeklyWorkouts() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const workouts = await prisma.workoutLog.findMany({
    where: {
      userId: userId,
      createdAt: {
        gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
      },
    },
  });

  return (
    <DashboardCardTemplate
      title="Weekly Workouts"
      icon={<IconCalendarWeek className="text-danger" />}
    >
      {workouts.length}
    </DashboardCardTemplate>
  );
}
