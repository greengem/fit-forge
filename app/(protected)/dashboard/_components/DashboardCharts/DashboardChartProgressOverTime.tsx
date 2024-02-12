import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/db/prisma";
import DashboardChartCard from './DashboardChartCard';
import DashboardChartProgressOverTimeClient from './DashboardChartProgressOverTime.client';

type WorkoutData = {
    date: Date;
    totalWeight: number;
};

export default async function DashboardChartProgressOverTime() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    let totalWeightLiftedOverTime: WorkoutData[] = await prisma.workoutLog.findMany({
        where: {
          userId: userId,
        },
        select: {
          date: true,
          exercises: {
            select: {
              sets: {
                select: {
                  weight: true,
                },
              },
            },
          },
        },
        orderBy: {
          date: 'asc',
        },
      }).then((workoutLogs) =>
        workoutLogs.map((log) => ({
          date: log.date,
          totalWeight: log.exercises.reduce(
            (total, exercise) => total + exercise.sets.reduce((setTotal, set) => setTotal + (set.weight || 0), 0),
            0
          ),
        }))
      );

    let accumulatedWeight = 0;
    totalWeightLiftedOverTime = totalWeightLiftedOverTime.map(item => {
        accumulatedWeight += item.totalWeight;
        return { ...item, totalWeight: accumulatedWeight };
    });

    //console.log(totalWeightLiftedOverTime);

    return (
        <DashboardChartCard title='Progress Over Time' colSpan="col-span-2">
            <DashboardChartProgressOverTimeClient data={totalWeightLiftedOverTime} />
        </DashboardChartCard>
    )
}