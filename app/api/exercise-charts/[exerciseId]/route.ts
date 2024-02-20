import { auth } from "@clerk/nextjs";
import prisma from '@/prisma/prisma';
import { subMonths } from 'date-fns';

export async function GET({ params }: { params: { exerciseId: string } }) {
    try {
        const { userId } : { userId: string | null } = auth();
        const { exerciseId } = params;
        const threeMonthsAgo = subMonths(new Date(), 3);

        if (!userId) {
            return new Response(JSON.stringify({ error: "User not authenticated" }), { status: 401 });
        }

        const exerciseChartLogs = await prisma.workoutLog.findMany({
            where: {
                userId: userId,
                date: {
                    gte: threeMonthsAgo,
                },
                exercises: {
                    some: {
                        exerciseId: exerciseId,
                    },
                },
            },
            include: {
                exercises: {
                    where: {
                        exerciseId: exerciseId,
                    },
                    include: {
                        sets: true,
                    },
                },
            },
            orderBy: {
                date: 'asc',
            },
        });

        return new Response(JSON.stringify(exerciseChartLogs), { status: 200 });
        
    } catch (error) {
        return new Response(JSON.stringify({ error: "Error fetching exercise history" }), { status: 500 });
    }
}
