import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getRoutines from "@/utils/getRoutines";
import WorkoutCards from "./_components/WorkoutCards";
import PageHeading from '@/components/PageHeading/PageHeading'
import CardGrid from "@/components/Grid/CardGrid";
import Link from "next/link";

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
            <WorkoutCards routine={routine} key={routine.id} />
          ))
        )}
      </CardGrid>

      <PageHeading title="Example Workouts" />
      <CardGrid>
        {systemRoutines.map((routine) => (
          <WorkoutCards routine={routine} key={routine.id} />
        ))}
      </CardGrid>
    </>
  )
}

