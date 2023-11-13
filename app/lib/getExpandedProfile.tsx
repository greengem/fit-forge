import prisma from '@/db/prisma';
import { ExpandedProfile } from '@/types/ProfileType';

export default async function getExpandedProfile(userId: string): Promise<ExpandedProfile | null> {
    if (!userId) {
        return null;
    }

    try {
        const expandedProfile = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            select: {
                age: true,
                height: true,
                weight: true,
                workoutsGoal: true,
                durationGoal: true,
            }
        });

        return expandedProfile as ExpandedProfile;
    } catch (error) {
        console.error("Error fetching expanded profile:", error);
        return null;
    }
}
