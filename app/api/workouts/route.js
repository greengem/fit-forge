import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';

//POST
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const data = JSON.parse(await request.text());
  console.log("Parsed data:", JSON.stringify(data, null, 2));

  const { name, date, workoutPlanId, exercises, duration } = data;
  
  try {
    const newWorkoutLog = await prisma.workoutLog.create({
      data: {
        name,
        date,
        workoutPlanId,
        userId: session.user.id,
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
            exerciseDuration: parseInt(exercise.exerciseDuration || 0, 10),
            order: i + 1,
            WorkoutLogExercise: {
              connect: { id: newLogExercise.id },
            },
          },
        });
      }
    }

    return NextResponse.json({ success: true, id: newWorkoutLog.id }, { status: 200 });

  } catch (error) {
    console.error('Error while processing workout log:', error);
    return NextResponse.json({ success: false, error: error.message, details: error.stack }, { status: 500 });
  }
}