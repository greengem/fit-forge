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
  try {
      const data = JSON.parse(await request.text());
      const { routineName, exercises, notes } = data;

      if (!routineName || !Array.isArray(exercises)) {
          return new Response(JSON.stringify({ error: "Invalid data format." }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
          });
      }

      const routineId = params.id;

      const updatedWorkoutPlan = await prisma.workoutPlan.update({
          where: { id: routineId },
          data: {
              name: routineName,
              notes: notes,
              WorkoutPlanExercise: {
                  deleteMany: { workoutPlanId: routineId },
                  create: exercises.map((exercise) => ({
                      exerciseId: exercise.id,
                      sets: exercise.sets,
                      reps: exercise.reps,
                      duration: exercise.duration,
                      order: exercise.order,
                  })),
              },
          },
      });

      return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
      });

  } catch (error) {
      console.error("Error while updating the routine:", error);
      return new Response(JSON.stringify({ error: "An error occurred updating the routine." }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
      });
  }
}
