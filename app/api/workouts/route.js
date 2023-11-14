import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from '@/db/prisma';

// POST
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response(JSON.stringify({ message: 'Unauthorized' }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    const userId = session.user.id;
    const workoutData = await request.json();
    console.log("Received workout data:", workoutData);
    const { name, date, duration, workoutPlanId, exercises } = workoutData;

    // Create a new WorkoutLog record
    const newWorkoutLog = await prisma.workoutLog.create({
      data: {
        name,
        date,
        duration,
        workoutPlanId,
        userId,
      },
    });
    console.log("New WorkoutLog created:", newWorkoutLog);

    // Add WorkoutLogExercises and SetLogs
    for (const exercise of exercises) {
      const workoutLogExerciseRecord = await prisma.workoutLogExercise.create({
        data: {
          workoutLogId: newWorkoutLog.id,
          exerciseId: exercise.exerciseId,
        },
      });
      console.log("New WorkoutLogExercise record:", workoutLogExerciseRecord);

      for (const set of exercise.sets) {
        await prisma.setLog.create({
          data: {
            workoutLogExerciseId: workoutLogExerciseRecord.id,
            reps: set.reps,
            weight: set.weight,
            exerciseDuration: set.duration,
            // order: ... if you want to add the order
          },
        });
      }
    }

    return new Response(JSON.stringify({ message: 'Workout saved successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error saving workout:', error);
    return new Response(JSON.stringify({ message: 'Failed to save workout', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
