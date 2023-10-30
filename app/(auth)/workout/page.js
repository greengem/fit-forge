import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import getRoutines from "@/app/lib/getRoutines";
import WorkoutCards from "./_components/WorkoutCards";
import PageHeading from '@/components/PageHeading/PageHeading'
import Link from "next/link";

export default async function WorkoutPage() {
  const session = await getServerSession(authOptions);
  const routines = await getRoutines(session.user.id)

  const userRoutines = routines.filter(routine => !routine.isSystemRoutine);
  const systemRoutines = routines.filter(routine => routine.isSystemRoutine);

  return (
    <>
      <PageHeading title="Start a Workout" />
        {userRoutines.length === 0 ? (
          <p>No routines available. Please <Link className="text-success" href="/routines/new">add one</Link>.</p>
        ) : (
            <WorkoutCards routines={userRoutines} isSystem={false} />
        )}

      <PageHeading title="Example Workouts" />
      <WorkoutCards routines={systemRoutines} isSystem={true} />
    </>
  )
}

