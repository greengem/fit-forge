import prisma from '@/db/prisma';

export default async function getUserFavoriteExercises(userId: string) {
    
    if (!userId || typeof userId !== 'string') {
        return [];
    }

    const favoriteExercises = await prisma.favoriteExercise.findMany({
        where: {
            userId: userId,
        },
        select: {
            exerciseId: true,
        }
    });

    return favoriteExercises;

}
