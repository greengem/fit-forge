import prisma from "@/db/prisma";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { subDays } from 'date-fns';

export default async function DashboardCardAverageWorkoutDuration({ userId } : { userId: string }) {
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

    return (
        <Card shadow="none" className="shadow-md">
            <CardHeader className="px-5">Average Workout Duration</CardHeader>
            <CardBody className="text-5xl pt-0 text-primary gap-y-3">{averageDuration}m</CardBody>
        </Card>
    )
}
