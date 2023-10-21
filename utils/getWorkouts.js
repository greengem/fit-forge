import prisma from '@/db/prisma';

export default async function getWorkouts(userId) {

	if (!userId || typeof userId !== 'string') {
		return [];
	}

	const workouts = await prisma.workoutLog.findMany({
		where: {
			userId: userId,
		},
        orderBy: {
            createdAt: 'desc'
        },
		select: {
			id: true,
			name: true,
			duration: true,
			createdAt: true,
			exercises: {
				select: {
					id: true,
					Exercise: {
						select: {
							name: true
						}
					},
					sets: {
						select: {
							weight: true,
							reps: true
						}
					}
				}
			}
		}
	});
	return workouts;
}