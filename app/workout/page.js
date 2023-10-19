import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";
import PageHeading from '@/components/PageHeading/PageHeading'
import CardGrid from "@/components/Grid/CardGrid";
import Link from 'next/link';
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
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) redirect("/login");  
  const routines = await getRoutines(session.user.userId)

  return (
    <>
      <PageHeading title="Start a Workout" />
      <CardGrid>
        {routines.map((routine) => (
          <Card key={routine.id}>
            <CardHeader>
              <p className='font-bold'>{routine.name}</p>
              {routine.notes && <p>{routine.notes}</p>}
            </CardHeader>
            <CardBody>
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
              <Button>
                <Link href={`/workout/${routine.id}`}>Start Workout</Link>
              </Button>
            </CardFooter>
        </Card>
      ))}
      </CardGrid>
    </>
  )
}

