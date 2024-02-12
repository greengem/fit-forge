import DashboardChartWorkoutClient from "./DashboardChartWorkouts.client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/db/prisma";

export default async function DashboardChartWorkout() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const workoutDates = await prisma.workoutLog.findMany({
        where: {
            userId: userId,
        },
        select: {
            createdAt: true,
            exercises: {
                select: {
                    id: true,
                },
            },
        },
        orderBy: {
            createdAt: 'asc',
        },
    });

    return <DashboardChartWorkoutClient workoutDates={workoutDates} />;
}
