import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';

//POST
export async function POST(request) {
  const session = await getServerSession(authOptions);
  const data = JSON.parse(await request.text());

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
        if (exercise.completed[i]) { 
          const setData = {
            order: i + 1,
            WorkoutLogExercise: {
              connect: { id: newLogExercise.id },
            },
          };
      
          if (exercise.exerciseDuration[i] !== null) {
            setData.exerciseDuration = parseInt(exercise.exerciseDuration[i], 10);
          }
      
          if (exercise.weight[i] !== null) {
            setData.weight = parseFloat(exercise.weight[i]);
          }
      
          if (exercise.reps[i] !== null) {
            setData.reps = parseInt(exercise.reps[i], 10);
          }
      
          await prisma.setLog.create({
            data: setData,
          });
        }
      }
    }

    return NextResponse.json({ success: true, id: newWorkoutLog.id }, { status: 200 });

  } catch (error) {
    console.error('Error while processing workout log:', error);
    return NextResponse.json({ success: false, error: error.message, details: error.stack }, { status: 500 });
  }
}
