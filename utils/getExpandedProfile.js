import prisma from '@/db/prisma';

export default async function getExpandedProfile(userId) {
    if (!userId || typeof userId !== 'string') {
        return null;
    }

    try {
        const expandedProfile = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                age: true,
                weight: true,
                height: true,
            }
        });

        return expandedProfile;
    } catch (error) {
        console.error("Error fetching expanded profile:", error);
        return null;
    }
}
