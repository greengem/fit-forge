import prisma from '@/db/prisma';
import { unstable_cache } from 'next/cache';

type FavoriteExercise = {
    exerciseId: string;
};

const getCachedFavoriteExercise = (userId: string) => unstable_cache(
    async () => {
        try {
            console.log(`Fetching favorite exercises for user: ${userId}`);  // Log when fetching from the database
            const favoriteExercises = await prisma.favoriteExercise.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    exerciseId: true,
                }
            });

            return favoriteExercises;
        } catch (error) {
            console.error("Error fetching favorite exercises for user:", userId, error);
            return [];
        }
    },
    ['favoriteExercises', userId],
    {
        tags: [`favoriteExercises_${userId}`],
        revalidate: 30000, // 30 seconds
    }
);

export default async function getUserFavoriteExercises(userId: string): Promise<FavoriteExercise[]> {
    if (!userId) {
        return [];
    }

    return await getCachedFavoriteExercise(userId)();
}
