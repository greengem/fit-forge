import { NextResponse } from 'next/server'
import prisma from '@/prisma/prisma';
import { revalidateTag } from 'next/cache'
import { auth } from "@clerk/nextjs";

// DELETE
export async function DELETE(req, context) {
  const { userId } = auth();
  const params = context.params;

  try {
    await prisma.workoutPlan.delete({
      where: {
        id: params.id,
      },
    });

    revalidateTag(`routines_${userId}`);
    return NextResponse.json({ message: "Routine deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting the routine." });
  }
}

// PUT
export async function PUT(request, { params }) {
  const { userId } = auth();
  
  try {
      const data = JSON.parse(await request.text());
      const { routineName, exercises, notes } = data;

      if (!routineName || !Array.isArray(exercises)) {
          return NextResponse.json({ error: "Invalid data format." }, { status: 400 });
      }

      const routineId = params.id;

      // First, update the workout plan details
      await prisma.workoutPlan.update({
          where: { id: routineId },
          data: {
              name: routineName,
              userId: userId,
              notes: notes,
          },
      });

      // Then, delete the existing exercises for the routine
      await prisma.workoutPlanExercise.deleteMany({
          where: { workoutPlanId: routineId },
      });

      // Finally, create the new exercises
      for (const exercise of exercises) {
          await prisma.workoutPlanExercise.create({
              data: {
                  workoutPlanId: routineId,
                  exerciseId: exercise.exerciseId,
                  trackingType: exercise.trackingType,
                  sets: exercise.sets,
                  reps: exercise.reps,
                  exerciseDuration: exercise.exerciseDuration,
                  order: exercise.order,
              },
          });
      }

      return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
      console.error('Error details:', error.message);
      return NextResponse.json({ error: "An error occurred updating the routine." }, { status: 500 });
  }
}

