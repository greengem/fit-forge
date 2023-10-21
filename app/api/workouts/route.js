import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';

//POST

export async function POST(request) {
  const session = await getServerSession(authOptions);
  const data = JSON.parse(await request.text());
  const { name, date, workoutPlanId, exercises, duration } = data;

  try {
      // Create the new workout log entry first
      const newWorkoutLog = await prisma.workoutLog.create({
          data: {
              name,
              date,
              workoutPlanId,
              userId: session.user.id,
              duration
          },
      });

      // An array to hold all the promises for Prisma operations
      let operations = [];

      for (let exercise of exercises) {
          // Create a promise for the workoutLogExercise creation
          const logExercisePromise = prisma.workoutLogExercise.create({
              data: {
                  workoutLogId: newWorkoutLog.id,
                  exerciseId: exercise.exerciseId,
              },
          });

          operations.push(logExercisePromise);

          logExercisePromise.then(newLogExercise => {
              // For each set of the exercise, create a promise for the setLog creation
              for (let i = 0; i < exercise.completed.length; i++) {
                  const setLogPromise = prisma.setLog.create({
                      data: {
                          weight: parseFloat(exercise.weight || 0),
                          reps: parseInt(exercise.reps || 0, 10),
                          order: i + 1,
                          WorkoutLogExercise: {
                              connect: { id: newLogExercise.id },
                          },
                      },
                  });

                  operations.push(setLogPromise);
              }
          });
      }

      // Use Prisma's transaction to batch execute all promises
      await prisma.$transaction(operations);

      return NextResponse.json({ success: true, id: newWorkoutLog.id }, { status: 200 });

  } catch (error) {
      console.error('Error while processing workout log:', error);
      return NextResponse.json({ success: false, error: error.message, details: error.stack }, { status: 500 });
  }
}
