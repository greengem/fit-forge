import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";

import getRoutines from "@/app/lib/getRoutines";

import PageHeading from '@/components/PageHeading/PageHeading'
import RoutineCards from './_components/RoutineCards';
import SystemRoutineDisplay from './_components/SystemRoutineDisplay';


export default async function WorkoutPage() {
  const session = await getServerSession(authOptions);
  const routines = await getRoutines(session!.user.id)

  const userRoutines = routines.filter(routine => !routine.isSystemRoutine);
  const systemRoutines = routines.filter(routine => routine.isSystemRoutine);

  return (
    <>
    <div className="flex gap-x-4 items-center justify-between">
      <PageHeading title="Start Workout" />
      <Button as={Link} href="/routines/new" variant="ghost" color="primary" className="gap-unit-1 mb-3">
        <IconPlus size={16} />New Routine
      </Button>
    </div>

    <h4 className="font-semibold text-2xl my-3">Your Workout Plans</h4>
    <RoutineCards routines={userRoutines} isSystem={false} />

    <h4 className="font-semibold text-2xl mb-3 mt-10">System Workout Plans</h4>
    <SystemRoutineDisplay systemRoutines={systemRoutines} />

    </>
  );
}