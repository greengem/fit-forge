import prisma from '@/db/prisma';
import { EquipmentType } from '@prisma/client';
import { unstable_cache } from 'next/cache';

const getCachedEquipment = (userId: string) => unstable_cache(
    async () => {
        console.log("Fetching equipment from database for user:", userId);
        const equipmentObjects = await prisma.userEquipment.findMany({
            where: {
                userId: userId,
            },
            select: {
                equipmentType: true,
            }
        });

        return equipmentObjects.map(eq => eq.equipmentType);
    },
    ['equipmentList', userId],
    {
        tags: [`equipment_${userId}`],
        revalidate: 30000,
    }
);

export default async function getEquipment(userId: string): Promise<EquipmentType[]> {
    if (!userId || typeof userId !== 'string') {
        return [];
    }

    return await getCachedEquipment(userId)();
}
