import prisma from '@/db/prisma';

export default async function getPbs(userId: string, limitToLastWeek = false) {
    if (!userId || typeof userId !== 'string') {
        return null;
    }

    let dateCondition = {};

    if (limitToLastWeek) {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        dateCondition = {
            createdAt: {
                gte: oneWeekAgo
            }
        };
    }

    try {
        const personalBests = await prisma.userExercisePB.findMany({
            where: {
                userId: userId,
                ...dateCondition
            }
        });

        return personalBests;
    } catch (error) {
        return null;
    }
}
