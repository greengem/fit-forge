import prisma from '@/db/prisma';
import { EquipmentType } from '@prisma/client';

export default async function getEquipment(userId: string): Promise<EquipmentType[]> {

    if (!userId || typeof userId !== 'string') {
        return [];
    }

    const equipmentObjects = await prisma.userEquipment.findMany({
        where: {
            userId: userId,
        },
        select: {
            equipmentType: true,
        }
    });

    const equipmentArray: EquipmentType[] = equipmentObjects.map(eq => eq.equipmentType);

    return equipmentArray;
}
