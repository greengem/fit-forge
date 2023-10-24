import prisma from '@/db/prisma';

export default async function getWorkouts(userId, limit = null) {
	if (!userId || typeof userId !== 'string') {
		return [];
	}

	const queryOptions = {
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
					exerciseId: true,
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
	};
	

	if (limit) {
		queryOptions.take = limit;
	}

	const workouts = await prisma.workoutLog.findMany(queryOptions);
	return workouts;
}
