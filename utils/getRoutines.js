import prisma from '@/db/prisma';

export default async function getRoutines(userId) {

	if (!userId || typeof userId !== 'string') {
		return [];
	}

	const routines = await prisma.workoutPlan.findMany({
		where: {
			userId: userId,
		},
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            notes: true,
            updatedAt: true,
            WorkoutPlanExercise: {
                select: {
                    sets: true,
                    reps: true,
                    duration: true,
                    order: true,
                    Exercise: {
                        select: {
                            id: true,
                            name: true,
                        }
                    }
                }
            }
        }
	});
	return routines;
}