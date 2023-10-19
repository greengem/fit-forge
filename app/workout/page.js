import prisma from '@/db/prisma';
import { redirect } from "next/navigation";
import PageHeading from '@/components/PageHeading/PageHeading'
import CardGrid from "@/components/Grid/CardGrid";
import Link from 'next/link';
import Image from "next/image";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Button } from "@nextui-org/button";

async function getRoutines(userId){
  const routines = await prisma.workoutPlan.findMany({
    where: {
      userId: userId,
    },
    include: {
        WorkoutPlanExercise: {
            include: {
                Exercise: true
            }
        }
    }
});

  return routines;
}

export default async function RoutinesPage() {
  if (!session) redirect("/login");  
  const routines = await getRoutines(session.user.userId)

  return (
    <>
      <PageHeading title="Start a Workout" />
      <CardGrid>
        {routines.map((routine) => (
          <Card key={routine.id}>
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="/icons/barbell.svg"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{routine.name}</p>
                <p className="text-small text-default-500">Updated: {new Date(routine.updatedAt).toLocaleDateString()}</p>
              </div>
            </CardHeader>
            <CardBody>
              {routine.notes && <p>{routine.notes}</p>}
              {routine.WorkoutPlanExercise.map((exerciseDetail) => (
                <ul key={exerciseDetail.Exercise.id} className='flex'>
                  {exerciseDetail.Exercise.name && <li>{exerciseDetail.Exercise.name}</li>}
                  {exerciseDetail.sets && <li>{exerciseDetail.sets} Sets</li>}
                  {exerciseDetail.reps && <li>{exerciseDetail.reps} Reps</li>}
                  {exerciseDetail.duration && <li>{exerciseDetail.duration} Duration</li>}
                </ul>
              ))}
            </CardBody>
            <CardFooter>
              <Button size="sm" color="primary">
                <Link href={`/workout/${routine.id}`}>Start Workout</Link>
              </Button>
            </CardFooter>
        </Card>
      ))}
      </CardGrid>
    </>
  )
}

