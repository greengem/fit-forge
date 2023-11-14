import prisma from '@/db/prisma';

interface WorkoutLog {
	id: string;
	name: string;
	duration: number;
	createdAt: Date;
	exercises: Exercise[];
  }
  
  interface Exercise {
	id: string;
	exerciseId: string;
	Exercise: {
	  name: string;
	};
	sets: {
	  weight: number | null;
	  reps: number | null;
	  exerciseDuration: number | null;
	}[];
  }
  
  export default async function getWorkouts(userId: string, limit?: number | null): Promise<WorkoutLog[]> {
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
  }