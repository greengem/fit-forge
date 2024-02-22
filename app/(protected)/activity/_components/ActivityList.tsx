import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { format } from "date-fns";
import FormatDuration from "@/utils/FormatDuration";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import ActivityMenu from "./ActivityMenu";
import ActivityModal from "./ActivityModal";

export default async function ActivityList() {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const workouts = await prisma.workoutLog.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      name: true,
      duration: true,
      createdAt: true,
      exercises: {
        select: {
          id: true,
          exerciseId: true,
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
    <>
      {workouts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
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
                        {format(new Date(activity.createdAt), "dd/MM/yyyy")}
                      </time>
                      <span className="text-gray-400"> | </span>
                      <span>
                        <FormatDuration seconds={activity.duration} />
                      </span>
                      <span className="text-gray-400"> | </span>
                      <span>{totalWeight} Kg</span>
                    </div>
                    <ActivityMenu activity={activity} />
                  </div>
                  <p className="text-sm text-zinc-500 leading-5">
                    {activity.name}
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
          <Link className="text-primary" href="/workout">
            Click here to start one
          </Link>
          .
        </p>
      )}
    </>
  );
}