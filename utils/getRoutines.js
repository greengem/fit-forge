import prisma from '@/db/prisma';

export default async function getRoutines(userId) {

  const whereClause = [
    {
      isSystemRoutine: true,
    },
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
      createdAt: 'desc'
    },
    select: {
      id: true,
      name: true,
      notes: true,
      updatedAt: true,
      isSystemRoutine: true,
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
              category: true,
            }
          }
        }
      }
    }
  });
  return routines;
}
