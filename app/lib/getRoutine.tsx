import prisma from '@/db/prisma';
import { WorkoutPlan } from '@prisma/client';
import { unstable_cache } from 'next/cache';

const getCachedRoutineById = (routineId: string) => unstable_cache(
    async () => {
        const routine = await prisma.workoutPlan.findUnique({
            where: { id: routineId },
			select: {
				id: true,
				name: true,
				notes: true,
				userId: true,
				createdAt: true,
				updatedAt: true,
				isSystemRoutine: true,
				systemRoutineCategory: true,
				WorkoutPlanExercise: {
					select: {
					sets: true,
					reps: true,
					exerciseDuration: true,
					order: true,
					trackingType: true,
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

        return routine;
    },
    ['routine', routineId],
    {
        tags: [`routine_${routineId}`],
        revalidate: 30000,
    }
);

export default async function getRoutineById(routineId: string): Promise<WorkoutPlan | null> {
    return await getCachedRoutineById(routineId)();
}
