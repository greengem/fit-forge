import prisma from '@/db/prisma';
import { ExpandedProfile } from '@/types/ProfileType';
import { unstable_cache } from 'next/cache';

const getCachedExpandedProfile = (userId: string) => unstable_cache(
    async () => {
        console.log("Fetching expanded profile from database for user:", userId);
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

            return expandedProfile;
        } catch (error) {
            console.error("Error in cached query for expanded profile:", error);
            return null;
        }
    },
    ['expandedProfile', userId],
    {
        tags: [`profiles_${userId}`],
        revalidate: 30000,
    }
);

export default async function getExpandedProfile(userId: string): Promise<ExpandedProfile | null> {
    if (!userId) {
        return null;
    }

    return await getCachedExpandedProfile(userId)();
}
