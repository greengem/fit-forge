import prisma from '@/db/prisma';
import { unstable_cache } from 'next/cache';

const getCachedWorkouts = (userId: string) => unstable_cache(
    async () => {
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
        });

        return workouts;
    },
    ['workoutsList', userId],
    {
        tags: [`workouts_${userId}`],
        revalidate: 30000,
    }
);

const getWorkouts = async (userId: string) => {
  if (!userId) {
    return [];
  }

  return await getCachedWorkouts(userId)();
};

export default getWorkouts;
