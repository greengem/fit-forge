'use server';
import { unstable_cache } from 'next/cache';
import prisma from '@/db/prisma';

async function fetchRoutinesFromDB(userId) {
    console.log("Fetching routines for user:", userId);

    if (!userId || typeof userId !== 'string') {
        return [];
    }

    return await prisma.workoutPlan.findMany({
        where: {
            userId: userId,
        },
        select: {
            id: true,
            name: true,
            notes: true,
            updatedAt: true,
            WorkoutPlanExercise: {
                select: {
                    sets: true,
                    reps: true,
                    duration: true,
                    order: true,
                    Exercise: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }
        }
    });
}

export default async function getRoutines(userId) {
    const cacheKey = `routineList-${userId}`;
    const getCachedOrFetchRoutines = unstable_cache(
        () => fetchRoutinesFromDB(userId),
        cacheKey,
        { tags: ['routines'], revalidate: 6000 }
    );

    return await getCachedOrFetchRoutines();
}
