import prisma from '@/db/prisma';

export default async function getEquipment(userId) {

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

    const equipmentArray = equipmentObjects.map(eq => eq.equipmentType);

	return equipmentArray;
}
