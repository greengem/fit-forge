import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { format } from "date-fns";
import DashboardChartVolumeLoadClient from "./DashboardChartVolumeLoad.client";
import {
  calculateIntervals,
  getIntervalStartAndEndDates,
} from "./utils/dateUtils";

type WorkoutVolumeLoadData = {
  period: string;
  totalVolumeLoad: number;
};

const mockData: WorkoutVolumeLoadData[] = [
  { period: '01-01-2024', totalVolumeLoad: 100 },
  { period: '02-01-2024', totalVolumeLoad: 140 },
  { period: '03-01-2024', totalVolumeLoad: 120 },
  { period: '04-01-2024', totalVolumeLoad: 160 },
  { period: '05-01-2024', totalVolumeLoad: 150 },
  { period: '06-01-2024', totalVolumeLoad: 170 },
  { period: '07-01-2024', totalVolumeLoad: 160 },
  { period: '08-01-2024', totalVolumeLoad: 180 },
  { period: '09-01-2024', totalVolumeLoad: 170 },
  { period: '10-01-2024', totalVolumeLoad: 200 },
];

export default async function DashboardChartVolumeLoad({
  dateRange = "1W",
}: {
  dateRange?: string;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const intervals = calculateIntervals(dateRange);
  const startDate = intervals[0];
  const endDate = new Date();

  const workoutLogs = await prisma.workoutLog.findMany({
    where: {
      userId: userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      exercises: {
        include: {
          sets: true,
        },
      },
    },
  });

  if (workoutLogs.length === 0) {
    return <DashboardChartVolumeLoadClient data={mockData} isUsingMockData />;
  }

  let lastKnownVolumeLoad = 0;

  let workoutVolumeLoads: WorkoutVolumeLoadData[] = intervals.map(
    (interval) => {
      const { startOfInterval, endOfInterval } = getIntervalStartAndEndDates(
        interval,
        dateRange,
      );

      let volumeLoadInInterval = workoutLogs
        .filter((workoutLog) => {
          const logDate = new Date(workoutLog.date);
          return logDate >= startOfInterval && logDate <= endOfInterval;
        })
        .reduce((totalVolume, workoutLog) => {
          const workoutVolume = workoutLog.exercises.reduce(
            (totalExerciseVolume, exercise) => {
              const exerciseVolume = exercise.sets.reduce(
                (totalSetVolume, set) => {
                  const setVolume = (set.weight || 0) * (set.reps || 0);
                  return totalSetVolume + setVolume;
                },
                0,
              );
              return totalExerciseVolume + exerciseVolume;
            },
            0,
          );
          return totalVolume + workoutVolume;
        }, 0);

      if (volumeLoadInInterval === 0) {
        volumeLoadInInterval = lastKnownVolumeLoad;
      } else {
        lastKnownVolumeLoad = volumeLoadInInterval;
      }

      return {
        period: format(startOfInterval, "dd-MM-yyyy"),
        totalVolumeLoad: volumeLoadInInterval,
      };
    },
  );

  return <DashboardChartVolumeLoadClient data={workoutVolumeLoads} />;
}
