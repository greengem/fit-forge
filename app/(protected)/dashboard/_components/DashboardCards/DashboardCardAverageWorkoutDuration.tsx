import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/db/prisma";
import DashboardCardTemplate from "./DashboardCardTemplate";
import { subDays } from 'date-fns';

export default async function DashboardCardAverageWorkoutDuration() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
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

    const totalDuration = workouts.reduce((total, workout) => total + workout.duration / 60, 0); // Convert seconds to minutes
    const averageDuration = workouts.length > 0 ? Math.round(totalDuration / workouts.length) : 0;

    return <DashboardCardTemplate title="Average Workout Duration">{averageDuration}</DashboardCardTemplate>;
}
