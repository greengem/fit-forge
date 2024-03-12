import { IconTarget, IconTargetArrow } from "@tabler/icons-react";
import DashboardGoalTemplate from "./DashboardGoalTemplate";
import prisma from "@/prisma/prisma";
import { auth } from "@clerk/nextjs";
import { UserGoal, GoalType } from "@prisma/client";
import { Progress } from "@nextui-org/progress";
import CreateDashboardGoal from "./CreateDashboardGoal";
import Link from "next/link";

type ExerciseWithIdAndName = {
  id: string;
  name: string;
};

type GoalWithProgress = {
  progress?: number;
  bestValue?: number;
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

    let bestValue = 0;
    for (const workoutLog of workoutLogs) {
      for (const exercise of workoutLog.exercises) {
        for (const set of exercise.sets) {
          if ((set.weight ?? 0) > bestValue) {
            bestValue = set.weight ?? 0;
          }
        }
      }
    }

    goal.progress = bestValue / goal.goalValue;
    goal.bestValue = bestValue;
}

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mb-3">
      {goals.map((goal, index) => (
        <DashboardGoalTemplate
          key={goal.id}
          title={`Goal ${index + 1}`}
          icon={<IconTarget className="text-danger" />}
          showSettings
          id={goal.id}
        >
          <div className="text-sm truncate mb-3">{goal.Exercise.name}</div>
          <div className="flex justify-between mb-3">
            <div className="text-sm">
              Best: <span className="text-danger">{goal.bestValue}</span>
            </div>
            <div className="text-sm">
              Target: <span className="text-primary">{goal.goalValue}</span>
            </div>
          </div>
          <Progress aria-label="Goal Progress" value={(goal.progress || 0) * 100} />
        </DashboardGoalTemplate>
      ))}

      {goals.length < 4 && (
        <DashboardGoalTemplate
          title="Add New Goal"
          icon={<IconTarget className="text-danger" />}
        >
          <p className="text-sm mb-3 truncate text-zinc-400">
            Select a <Link href="/exercises" className="text-primary">favorite exercise</Link> to track
          </p>
          <CreateDashboardGoal />
        </DashboardGoalTemplate>
      )}
    </div>
  );
}
