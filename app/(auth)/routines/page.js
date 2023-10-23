import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getRoutines from '@/utils/getRoutines';
import PageHeading from '@/components/PageHeading/PageHeading';
import CardGrid from "@/components/Grid/CardGrid";
import DeleteButton from './DeleteButton';
import Link from 'next/link';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import Image from "next/image";
import { Button } from "@nextui-org/button";


export default async function RoutinesPage() {
  const session = await getServerSession(authOptions);
  const routines = await getRoutines(session.user.id);

  return (
    <>
      <PageHeading title="Routines" />
      <Button color="primary" className="mb-5">
        <Link href="/routines/new"> New Routine</Link>
      </Button>
      <CardGrid>
        {routines.map((routine) => (
          <Card key={routine.id}>
            <CardHeader className="flex gap-3 px-5">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="/icons/barbell-darkmode.svg"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{routine.name}</p>
                <p className="text-small text-default-500">Updated: {new Date(routine.updatedAt).toLocaleDateString()}</p>
              </div>
            </CardHeader>
            <CardBody className="py-0 pb-2">
              {routine.notes && <p className="text-default-500 text-sm mb-2">Notes: {routine.notes}</p>}
              <ul className="space-y-1">
              {routine.WorkoutPlanExercise.sort((a, b) => a.order - b.order).map((exerciseDetail) => (
                  <li key={exerciseDetail.Exercise.id}>
                    {exerciseDetail.reps && exerciseDetail.reps} x {exerciseDetail.sets && exerciseDetail.sets} {exerciseDetail.Exercise.name}
                  </li>
              ))}
              </ul>
            </CardBody>
            <CardFooter className="gap-2 px-5">
              <Button as={Link} href={`/routines/${routine.id}`} size="sm" color="secondary">Edit</Button>
              <DeleteButton id={routine.id} />
            </CardFooter>
          </Card>
        ))}
      </CardGrid>
    </>
  )
}
