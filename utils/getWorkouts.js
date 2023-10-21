// in utils/getWorkouts.js

'use server';
import { unstable_cache } from 'next/cache';
import prisma from '@/db/prisma';

async function fetchWorkoutsFromDB(userId) {
    console.log("Fetching workouts for user:", userId);

    if (!userId || typeof userId !== 'string') {
        return [];
    }

    return await prisma.workoutLog.findMany({
        where: {
            userId: userId,
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
                            name: true
                        }
                    },
                    sets: {
                        select: {
                            weight: true,
                            reps: true
                        }
                    }
                }
            }
        }
    });
}

export default async function getWorkouts(userId) {
    const cacheKey = `workoutList-${userId}`;
    const getCachedOrFetchWorkouts = unstable_cache(
        () => fetchWorkoutsFromDB(userId),
        cacheKey,
        { tags: ['workouts'], revalidate: 6000 } // You can adjust the revalidate time as per your needs
    );

    return await getCachedOrFetchWorkouts();
}
