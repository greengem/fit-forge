// DashboardCardDailyStreak.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/db/prisma";
import DashboardCardTemplate from "./DashboardCardTemplate";
import { differenceInCalendarDays } from 'date-fns';

export default async function DashboardCardDailyStreak() {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const workouts = await prisma.workoutLog.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            createdAt: true,
        },
    });

    let streak = 0;
    for (let i = 0; i < workouts.length - 1; i++) {
        const diff = differenceInCalendarDays(workouts[i].createdAt, workouts[i + 1].createdAt);
        if (diff === 1) {
            streak++;
        } else if (diff > 1) {
            break;
        }
    }

    return <DashboardCardTemplate title="Daily Streak">{streak}</DashboardCardTemplate>;
}
