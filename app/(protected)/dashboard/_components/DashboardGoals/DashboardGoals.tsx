import { IconTarget } from "@tabler/icons-react";
import DashboardGoalTemplate from "./DashboardGoalTemplate";
import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { UserGoal, GoalType } from "@prisma/client";
import { Progress } from "@nextui-org/progress";

type ExerciseWithIdAndName = {
  id: string;
  name: string;
};

type GoalWithProgress = {
  progress?: number;
  Exercise: ExerciseWithIdAndName;
} & UserGoal;

export default async function DashboardGoals() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

const goals: GoalWithProgress[] = await prisma.userGoal.findMany({
    where: {
      userId,
    },
    include: {
      Exercise: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  
  for (const goal of goals) {
    const workoutLogs = await prisma.workoutLog.findMany({
      where: {
        userId,
        exercises: {
          some: {
            exerciseId: goal.exerciseId,
          },
        },
      },
      include: {
        exercises: {
          where: {
            exerciseId: goal.exerciseId,
          },
          include: {
            sets: true,
          },
        },
      },
    });
  
    // Find the best value for each workout log
    let bestValue = 0;
    for (const workoutLog of workoutLogs) {
      for (const exercise of workoutLog.exercises) {
        for (const set of exercise.sets) {
          if (goal.goalType === GoalType.WEIGHT && (set.weight ?? 0) > bestValue) {
            bestValue = set.weight ?? 0;
          } else if (goal.goalType === GoalType.REPS && (set.reps ?? 0) > bestValue) {
            bestValue = set.reps ?? 0;
          } else if (goal.goalType === GoalType.DURATION && (set.exerciseDuration ?? 0) > bestValue) {
            bestValue = set.exerciseDuration ?? 0;
          }
        }
      }
    }
  
    // Calculate the progress and add it to the goal object
    goal.progress = bestValue / goal.goalValue;
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mb-3">
      
      {goals.map((goal, index) => (
        <DashboardGoalTemplate key={index} title={`Goal ${index + 1}`} icon={<IconTarget className="text-danger" />}>
          <div>{goal.Exercise.name}</div>
          <div className="text-xs">Target: {goal.goalValue}</div>
          <div>{goal.goalValue}</div>
          {/* <Progress value={goal.progress * 100} /> */}
        </DashboardGoalTemplate>
      ))}

    </div>
  );
}
