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

  const userRoutines = routines.filter(routine => !routine.isSystemRoutine);
  const systemRoutines = routines.filter(routine => routine.isSystemRoutine);

  return (
    <>
      <PageHeading title="Start a Workout" />
      <CardGrid>
        {userRoutines.length === 0 ? (
          <p>No routines available. Please <Link className="text-success" href="/routines/new">add one</Link>.</p>
        ) : (
          userRoutines.map((routine) => (
            <Card key={routine.id}>
              <CardHeader className="flex gap-3 px-5">
                <div className="flex flex-col">
                  <p className="text-md font-semibold text-success">{routine.name}</p>
                </div>
              </CardHeader>
              <CardBody className="py-0 pb-2">
                <ul className="space-y-1 text-sm">
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

      <PageHeading title="Example Workouts" />
      <CardGrid>
        {systemRoutines.length === 0 ? (
          <p>No routines available. Please <Link className="text-success" href="/routines/new">add one</Link>.</p>
        ) : (
          systemRoutines.map((routine) => (
            <Card key={routine.id}>
              <CardHeader className="flex gap-3 px-5">
                <div className="flex flex-col">
                  <p className="text-md font-semibold text-success">{routine.name}</p>
                </div>
              </CardHeader>
              <CardBody className="py-0 pb-2">
                <ul className="space-y-1 text-sm">
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

