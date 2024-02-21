import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { format } from "date-fns";
import {
  calculateIntervals,
  getIntervalStartAndEndDates,
} from "./utils/dateUtils";
import DashboardChartWorkoutFrequencyClient from "./DashboardChartWorkoutFrequency.client";

type WorkoutFrequencyData = {
  period: string;
  workouts: number;
};

export default async function DashboardChartWorkoutFrequency({
  dateRange = "3M",
}: {
  dateRange?: string;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const intervals = calculateIntervals(dateRange);

  const workoutLogs = await prisma.workoutLog.groupBy({
    by: ["date"],
    where: {
      userId: userId,
      date: {
        gte: intervals[0],
      },
    },
    _count: {
      _all: true,
    },
    orderBy: {
      date: "asc",
    },
  });

  const workoutsPerInterval = intervals.map(
    (interval): WorkoutFrequencyData => {
      const { startOfInterval, endOfInterval } = getIntervalStartAndEndDates(
        interval,
        dateRange,
      );

      const workoutsInInterval = workoutLogs.filter((log) => {
        const logDate = new Date(log.date);
        return logDate >= startOfInterval && logDate <= endOfInterval;
      });

      return {
        period: format(startOfInterval, "dd-MM-yyyy"),
        workouts: workoutsInInterval.length,
      };
    },
  );

  return <DashboardChartWorkoutFrequencyClient data={workoutsPerInterval} />;
}
