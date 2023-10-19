import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";

import PageHeading from '@/components/PageHeading/PageHeading';
import CardGrid from "@/components/Grid/CardGrid";
import DeleteButton from './DeleteButton';
import Link from 'next/link';

import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";

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
  const session = await getServerSession(authOptions);
  const routines = await getRoutines(session.user.id)

  return (
    <>
      <PageHeading title="Routines" />
      <Button color="primary" className="mb-5">
        <Link href="/routines/new"> New Routine</Link>
      </Button>
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
            <CardFooter className="gap-2">
              <Button size="sm" color="secondary">
                <Link href={`/routines/${routine.id}`}>Edit</Link>
              </Button>
              <DeleteButton id={routine.id} />
              
            </CardFooter>
          </Card>
        ))}
        </CardGrid>
    </>
  )
}

