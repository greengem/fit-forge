import prisma from '@/db/prisma';

const getWorkouts = async (userId, limit) => {
  if (!userId || typeof userId !== 'string') {
    return [];
  }

  const workouts = await prisma.workoutLog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: 'desc',
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
              name: true,
            },
          },
          sets: {
            select: {
              weight: true,
              reps: true,
              exerciseDuration: true,
            },
          },
        },
      },
    },
    take: limit || undefined,
  });

  return workouts;
};

export default getWorkouts;
