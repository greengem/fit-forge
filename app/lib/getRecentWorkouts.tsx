import prisma from '@/db/prisma';
import { unstable_cache } from 'next/cache';

const getCachedRecentWorkouts = (userId: string) => unstable_cache(
    async () => {
        console.log("Fetching recent workouts from database for user:", userId);
        const workouts = await prisma.workoutLog.findMany({
            where: {
                userId: userId,
            },
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
                        exerciseId: true,
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
            take: 4,
        });

        return workouts;
    },
    ['recentWorkoutsList', userId],
    {
        tags: [`recentWorkouts_${userId}`],
        revalidate: 30000,
    }
);

const getRecentWorkouts = async (userId: string) => {
    if (!userId) {
      return [];
    }
  
    return await getCachedRecentWorkouts(userId)();
  };

export default getRecentWorkouts;
