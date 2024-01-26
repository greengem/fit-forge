import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import getRoutines from '@/app/lib/getRoutines';

import PageHeading from '@/components/PageHeading/PageHeading';
import Link from 'next/link';
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { WorkoutPlan } from "@prisma/client";
import RoutineDisplay from './_components/RoutineDisplay';

export default async function RoutinesPage() {
  const session = await getServerSession(authOptions);
  let routines: WorkoutPlan[] = [];
  if (session && session.user) {
    routines = await getRoutines(session.user.id);
  }
  
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
