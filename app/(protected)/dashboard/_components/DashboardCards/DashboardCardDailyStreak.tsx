// DashboardCardDailyStreak.tsx
import prisma from "@/db/prisma";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { differenceInCalendarDays } from 'date-fns';

export default async function DashboardCardDailyStreak({ userId } : { userId: string }) {

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

    return (
        <Card shadow="none" className="shadow-md">
            <CardHeader className="px-5">Daily Streak</CardHeader>
            <CardBody className="text-5xl pt-0 text-primary gap-y-3">{streak}</CardBody>
        </Card>
    );
}
