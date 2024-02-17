import { auth } from "@clerk/nextjs";
import getRoutines from '@/app/lib/getRoutines';

import PageHeading from '@/components/PageHeading/PageHeading';
import Link from 'next/link';
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { WorkoutPlan } from "@prisma/client";
import RoutineDisplay from './_components/RoutineDisplay';

export default async function RoutinesPage() {
  const { userId } : { userId: string | null } = auth();

  if (!userId) {
    throw new Error('You must be signed in to view this page.');
  }

  let routines: WorkoutPlan[] = [];
  routines = await getRoutines(userId);
  
  const userRoutines = routines.filter(routine => !routine.isSystemRoutine);
  const systemRoutines = routines.filter(routine => routine.isSystemRoutine);

  return (
      <>
      <div className="flex gap-x-4 items-center justify-between">
        <PageHeading title="Routines" />
        <Button as={Link} href="/routines/new" variant="ghost" color="primary" className="gap-unit-1 mb-3">
          <IconPlus size={16} />New Routine
        </Button>
      </div>


        <RoutineDisplay userRoutines={userRoutines} systemRoutines={systemRoutines} />

      </>
    );
  }
