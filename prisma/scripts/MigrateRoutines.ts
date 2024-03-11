// Run with
// npx ts-node --compiler-options '{"module":"commonjs"}' prisma/scripts/MigrateRoutines.ts

import { PrismaClient } from "@prisma/client";
import { predefinedWorkouts } from "./predefinedWorkouts";

const prisma = new PrismaClient();

async function main() {
  // Identify names of predefined workout plans for comparison
  const predefinedNames = predefinedWorkouts.map((plan) => plan.name);

  // Insert or update predefined workout plans
  for (const plan of predefinedWorkouts) {
    const existingPlan = await prisma.workoutPlan.findFirst({
      where: {
        name: plan.name,
        isSystemRoutine: true,
      },
    });

    if (!existingPlan) {
      const workoutPlanExercisesData = plan.WorkoutPlanExercises.map(
        (exercise) => {
          const baseData = {
            sets: exercise.sets,
            order: exercise.order,
            trackingType: exercise.trackingType,
            Exercise: {
              connect: { id: exercise.exerciseId },
            },
          };

          return exercise.trackingType === "reps"
            ? {
                ...baseData,
                reps: exercise.reps ?? null,
                exerciseDuration: null,
              }
            : {
                ...baseData,
                reps: null,
                exerciseDuration: exercise.duration ?? null,
              };
        },
      );

      await prisma.workoutPlan.create({
        data: {
          name: plan.name,
          notes: plan.notes,
          isSystemRoutine: true,
          systemRoutineCategory: plan.systemRoutineCategory,
          WorkoutPlanExercise: {
            create: workoutPlanExercisesData,
          },
        },
      });
      console.log(`Inserted workout plan: ${plan.name}`);
    } else {
      console.log(`Workout plan already exists: ${plan.name}`);
    }
  }

  // Delete any isSystemRoutine: true plans not in the predefined list
  const systemWorkoutPlans = await prisma.workoutPlan.findMany({
    where: {
      isSystemRoutine: true,
    },
  });

  for (const plan of systemWorkoutPlans) {
    if (!predefinedNames.includes(plan.name)) {
      await prisma.workoutPlan.delete({
        where: {
          id: plan.id,
        },
      });
      console.log(`Deleted workout plan not in predefined list: ${plan.name}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
