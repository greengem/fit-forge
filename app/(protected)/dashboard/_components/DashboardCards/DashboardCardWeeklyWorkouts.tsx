// DashboardCardWeeklyWorkouts.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import prisma from "@/db/prisma";
import { Card, CardHeader, CardBody } from "@nextui-org/card";

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

    return (
        <Card shadow="none" className="shadow-md">
            <CardHeader className="px-5">Weekly Workouts</CardHeader>
            <CardBody className="text-5xl pt-0 text-primary gap-y-3">{workouts.length}</CardBody>
        </Card>
    );
}
