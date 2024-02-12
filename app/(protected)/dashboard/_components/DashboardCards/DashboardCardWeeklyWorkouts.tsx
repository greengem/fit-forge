// DashboardCardWeeklyWorkouts.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/db/prisma";
import DashboardCardTemplate from "./DashboardCardTemplate";

export default async function DashboardCardWeeklyWorkouts() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    const workouts = await prisma.workoutLog.findMany({
        where: {
            userId: userId,
            createdAt: {
                gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
            },
        },
    });

    return <DashboardCardTemplate title="Weekly Workouts">{workouts.length}</DashboardCardTemplate>;
}
