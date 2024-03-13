import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { format } from "date-fns";
import FormatDuration from "@/utils/FormatDuration";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import ActivityMenu from "./ActivityMenu";
import ActivityModal from "./ActivityModal";
import { ActivityModalProvider } from "@/contexts/ActivityModalContext";

export default async function ActivityList() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const workouts = await prisma.workoutLog.findMany({
    where: {
      userId: userId,
      inProgress: false,
    },
    orderBy: {
      date: "desc",
    },
    select: {
      id: true,
      duration: true,
      date: true,
      WorkoutPlan: {
        select: {
          name: true,
        },
      },
      exercises: {
        select: {
          id: true,
          exerciseId: true,
          trackingType: true,
          Exercise: {
            select: {
              name: true,
            },
          },
          sets: {
            select: {
              weight: true,
              reps: true,
              exerciseDuration: true,
            },
          },
        },
      },
    },
  });

  return (
    <ActivityModalProvider>
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3">
          {workouts.map((activity) => {
            const totalWeight = activity.exercises.reduce((total, exercise) => {
              const exerciseWeight = exercise.sets.reduce(
                (total, set) => total + (set.weight || 0),
                0,
              );
              return total + exerciseWeight;
            }, 0);

            return (
              <Card key={activity.id} shadow="none" className="shadow-md">
                <CardHeader className="px-5 pt-4 flex-col items-start">
                  <div className="flex justify-between gap-2 w-full items-center">
                    <div className="tracking-tight grow">
                      <time>
                        {format(new Date(activity.date), "dd/MM/yyyy")}
                      </time>
                      <span className="text-zinc-500"> | </span>
                      <span>
                        <FormatDuration seconds={activity.duration} />
                      </span>
                      <span className="text-zinc-500"> | </span>
                      <span>{totalWeight} Kg</span>
                    </div>
                    <ActivityMenu activity={activity} />
                  </div>
                  <p className="text-sm text-zinc-400 leading-5">
                    {activity.WorkoutPlan.name}
                  </p>
                </CardHeader>
                <CardBody className="pt-0 px-5 pb-4">
                  <ul>
                    {activity.exercises.map((exercise) => (
                      <li
                        key={exercise.id}
                        className="flex gap-1 justify-between text-sm"
                      >
                        <p className="grow truncate">
                          {exercise.Exercise.name}
                        </p>
                        <p className="shrink-0">{exercise.sets.length} Sets</p>
                      </li>
                    ))}
                  </ul>
                </CardBody>
              </Card>
            );
          })}
          <ActivityModal />
        </div>
      ) : (
        <p>
          No workouts have been completed.{" "}
          <Link className="text-danger dark:text-primary" href="/workout">
            Click here to start one
          </Link>
          .
        </p>
      )}
    </ActivityModalProvider>
  );
}
