import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';

export async function POST(request) {
  const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
  const data = JSON.parse(await request.text());
  const { name, date, workoutPlanId, exercises, duration } = data;
  
  const userId = session.user.userId;
  
  try {
    const newWorkoutLog = await prisma.workoutLog.create({
      data: {
        name,
        date,
        workoutPlanId,
        userId,
        duration
      },
    });
  
    for (let exercise of exercises) {
      const newLogExercise = await prisma.workoutLogExercise.create({
        data: {
          workoutLogId: newWorkoutLog.id,
          exerciseId: exercise.exerciseId,
        },
      });
  
      for (let i = 0; i < exercise.completed.length; i++) {
        await prisma.setLog.create({
          data: {
            weight: parseFloat(exercise.weight || 0),
            reps: parseInt(exercise.reps || 0, 10),
            order: i + 1,
            WorkoutLogExercise: {
              connect: { id: newLogExercise.id },
            },
          },
        });
      }
    }
  
    return new Response(JSON.stringify({ success: true, id: newWorkoutLog.id }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    } catch (error) {
    console.error('Error while processing workout log:', error);
    return new Response(JSON.stringify({ success: false, error: error.message, details: error.stack }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
    });
  }
}
