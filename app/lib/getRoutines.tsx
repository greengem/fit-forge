import prisma from '@/db/prisma';
import { WorkoutPlan, Prisma } from '@prisma/client';

export default async function getRoutines(userId: string | null): Promise<WorkoutPlan[]> {
	const whereClause: Prisma.WorkoutPlanWhereInput[] = [
		{isSystemRoutine: true},
	];

	if (userId && typeof userId === 'string') {
		whereClause.push({
			userId: userId,
		});
	}

	const routines = await prisma.workoutPlan.findMany({
		where: {
			OR: whereClause,
		},
			orderBy: {
			createdAt: 'desc',
		},
		select: {
		id: true,
		name: true,
		notes: true,
		userId: true,
		createdAt: true,
		updatedAt: true,
		isSystemRoutine: true,
		WorkoutPlanExercise: {
			select: {
			sets: true,
			reps: true,
			exerciseDuration: true,
			order: true,
			Exercise: {
				select: {
				id: true,
				name: true,
				category: true,
				},
			},
			},
		},
		},
	});
	return routines;
	}
