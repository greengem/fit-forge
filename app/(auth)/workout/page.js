import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getRoutines from "@/utils/getRoutines";
import PageHeading from '@/components/PageHeading/PageHeading'
import CardGrid from "@/components/Grid/CardGrid";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default async function WorkoutPage() {
  const session = await getServerSession(authOptions);
  const routines = await getRoutines(session.user.id)

  return (
    <>
      <PageHeading title="Start a Workout" />
      <CardGrid>
        {routines.length === 0 ? (
          <p>No routines available. Please <Link className="text-success" href="/routines/new">add one</Link>.</p>
        ) : (
          routines.map((routine) => (
            <Card key={routine.id}>
              <CardHeader className="flex gap-3 px-5">
                <div className="flex flex-col">
                  <p className="text-md font-semibold text-success">{routine.name}</p>
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
              <CardFooter className="px-5">
                <Button variant="ghost" as={Link} href={`/workout/${routine.id}`} size="sm" color="success" className="gap-unit-1">
                  <IconPlayerPlayFilled size={16} />
                  Start Workout
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </CardGrid>
    </>
  )
}

