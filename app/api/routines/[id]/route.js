import { NextResponse } from 'next/server'
import prisma from '@/db/prisma';

// GET
export async function GET(request, { params }) {
  const { id } = params;

  try {
    const routine = await prisma.workoutPlan.findFirst({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        notes: true,
        WorkoutPlanExercise: {
          select: {
            Exercise: {
              select: {
                id: true,
                name: true,
              }
            },
            sets: true,
            reps: true,
            duration: true,
            order: true,
          }
        },
        updatedAt: true,
      }
    });

    if (!routine) {
      return NextResponse.json({ error: "Routine not found" }, { status: 404 });
    }

    // Normalize the data here
    const normalizedExercises = routine.WorkoutPlanExercise.map(exercise => {
      return {
        ...exercise,
        ...exercise.Exercise
      };
    });

    const normalizedRoutine = {
      ...routine,
      exercises: normalizedExercises
    }    

    return NextResponse.json(normalizedRoutine);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred fetching the routine." }, { status: 500 });
  }
}


// DELETE
export async function DELETE(req, context) {
  const params = context.params;

  try {
    await prisma.workoutPlan.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Routine deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting the routine." });
  }
}


// PUT
export async function PUT(request, { params }) {
  const { id } = params;
  const { routineName, exercises, notes } = request.body;

  try {
    // Start a transaction to handle multiple operations
    await prisma.$transaction(async (prisma) => {
      // 1. Update the workoutPlan's primary details
      await prisma.workoutPlan.update({
        where: { id: id },
        data: {
          name: routineName,
          notes: notes,
        },
      });

      // 2. Delete previous associated exercises for the routine
      await prisma.workoutPlanExercise.deleteMany({
        where: {
          workoutPlanId: id,
        },
      });

      // 3. Create new associated exercises for the routine
      for (let exercise of exercises) {
        await prisma.workoutPlanExercise.create({
          data: {
            sets: exercise.sets,
            reps: exercise.reps,
            order: exercise.order,
            Exercise: {
              connect: {
                id: exercise.id,
              },
            },
            WorkoutPlan: {
              connect: {
                id: id,
              },
            },
          },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "An error occurred updating the routine." }, { status: 500 });
  }
}
