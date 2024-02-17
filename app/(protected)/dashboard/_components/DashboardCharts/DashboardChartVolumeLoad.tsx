import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { format } from 'date-fns';
import DashboardChartVolumeLoadClient from './DashboardChartVolumeLoad.client';
import { calculateIntervals, getIntervalStartAndEndDates } from "./utils/dateUtils";

type WorkoutVolumeLoadData = {
  period: string;
  totalVolumeLoad: number;
};

export default async function DashboardChartVolumeLoad({ dateRange = '3M' }: { dateRange?: string }) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error('You must be signed in to view this page.');
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

  let workoutVolumeLoads: WorkoutVolumeLoadData[] = intervals.map(interval => {
    const { startOfInterval, endOfInterval } = getIntervalStartAndEndDates(interval, dateRange);

    const volumeLoadInInterval = workoutLogs.filter(workoutLog => {
      const logDate = new Date(workoutLog.date);
      return logDate >= startOfInterval && logDate <= endOfInterval;
    }).reduce((totalVolume, workoutLog) => {
      const workoutVolume = workoutLog.exercises.reduce((totalExerciseVolume, exercise) => {
        const exerciseVolume = exercise.sets.reduce((totalSetVolume, set) => {
          const setVolume = (set.weight || 0) * (set.reps || 0);
          return totalSetVolume + setVolume;
        }, 0);
        return totalExerciseVolume + exerciseVolume;
      }, 0);
      return totalVolume + workoutVolume;
    }, 0);

    return {
      period: format(startOfInterval, 'dd-MM-yyyy'),
      totalVolumeLoad: volumeLoadInInterval,
    };
  });

  return <DashboardChartVolumeLoadClient data={workoutVolumeLoads} />;
}
