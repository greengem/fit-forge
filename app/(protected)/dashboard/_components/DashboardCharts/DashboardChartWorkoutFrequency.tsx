import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/db/prisma";
import { subMonths, startOfWeek, endOfWeek, eachWeekOfInterval, format } from 'date-fns';
import DashboardChartCard from './DashboardChartCard';
import DashboardChartWorkoutFrequencyClient from "./DashboardChartWorkoutFrequency.client";

type WorkoutFrequencyData = {
  week: string;
  workouts: number;
};

export default async function DashboardChartWorkoutFrequency() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const threeMonthsAgo = subMonths(new Date(), 3);

    const workoutLogs = await prisma.workoutLog.groupBy({
      by: ['date'],
      where: {
        userId: userId,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    const weeks = eachWeekOfInterval({
      start: threeMonthsAgo,
      end: new Date(),
    }, { weekStartsOn: 1 });

    const workoutsPerWeek: WorkoutFrequencyData[] = weeks.map(week => {
        const startOfWeekDate = startOfWeek(week, { weekStartsOn: 1 });
        const endOfWeekDate = endOfWeek(week, { weekStartsOn: 1 });
        const workoutsThisWeek = workoutLogs.filter(log => {
            const logDate = new Date(log.date);
            return logDate >= startOfWeekDate && logDate <= endOfWeekDate;
        });
        return {
            week: format(startOfWeekDate, 'yyyy-MM-dd'),
            workouts: workoutsThisWeek.length,
        };
    });

    //console.log(workoutsPerWeek);

    return (
        <DashboardChartCard title='Workout Frequency' colSpan="col-span-2">
            <DashboardChartWorkoutFrequencyClient data={workoutsPerWeek} />
        </DashboardChartCard>
    )
}