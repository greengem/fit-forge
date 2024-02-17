import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { format } from 'date-fns';
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Button } from "@nextui-org/button";
import PageHeading from "@/components/PageHeading/PageHeading";

function formatDuration(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
}

export default async function DashboardRecentActivity() {
    const { userId } : { userId: string | null } = auth();

    if (!userId) {
        throw new Error('You must be signed in to view this page.');
    }

    const recentActivity = await prisma.workoutLog.findMany({
        where: {
            userId: userId,
        },
        take: 4,
        orderBy: {
            createdAt: 'desc',
        },
        select: {
            id: true,
            name: true,
            duration: true,
            createdAt: true,
            exercises: {
                select: {
                    id: true,

                    Exercise: {
                        select: {
                            name: true,
                        },
                    },
                    sets: {
                        select: {
                            weight: true,
                            reps: true,
                            exerciseDuration: true,
                        },
                    },
                },
            },
        },
    });

    return (
        <>
            {recentActivity.length > 0 && (
                <>
                <PageHeading title="Recent Activity" />
                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-5">
                        {recentActivity.map((activity) => {
                            const totalWeight = activity.exercises.reduce((total, exercise) => {
                                const exerciseWeight = exercise.sets.reduce((total, set) => total + (set.weight || 0), 0);
                                return total + exerciseWeight;
                            }, 0);
                
                            return (
                                <Card key={activity.id} shadow="none" className="shadow-md">
                                    <CardHeader className="flex gap-3 px-5 pt-4">
                                        <div className="flex flex-col flex-grow">
                                            <p className="text-md  leading-5">{activity.name}</p>
                                            <p className="text-xs text-default-500 leading-5">
                                                <span className="flex space-x-1">
                                                    <time>{format(new Date(activity.createdAt), 'MM/dd/yyyy')}</time>
                                                    <span className="text-gray-400">|</span>
                                                    <span>{formatDuration(activity.duration)}</span>
                                                    <span className="text-gray-400">|</span>
                                                    <span>{totalWeight} KG</span>
                                                </span>
                                            </p>
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-0 px-5 pb-4">
                                        <ul>
                                            {activity.exercises.map((exercise) => (
                                                <li key={exercise.id} className="flex gap-1 justify-between text-sm">
                                                    <p className="grow truncate">{exercise.Exercise.name}</p>
                                                    <p className="shrink-0">{exercise.sets.length} Sets</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </CardBody>
                                </Card>
                            );
                        })}
                    </div>
                    <div className="flex justify-center">
                        <Button variant="ghost" as={Link} href="/activity">View all activity</Button>
                    </div>
                </>
            )}
        </>
    );
}