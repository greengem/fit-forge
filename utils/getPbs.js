import prisma from '@/db/prisma';

export default async function getPbs(userId) {
    if (!userId || typeof userId !== 'string') {
        return null;
    }

    try {
        const personalBests = await prisma.userExercisePB.findMany({
            where: {
                userId: userId,
            }
        });

        return personalBests;
    } catch (error) {
        console.error("Error fetching personal bests:", error);
        return null;
    }
}
