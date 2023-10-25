import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getRoutines from '@/utils/getRoutines';
import RoutineCards from './_components/RoutineCards';
import PageHeading from '@/components/PageHeading/PageHeading';
import Link from 'next/link';
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";

export default async function RoutinesPage() {
  const session = await getServerSession(authOptions);
  const routines = await getRoutines(session.user.id);

  return (
    <>
      <PageHeading title="My Routines" />
      <Button as={Link} href="/routines/new" color="success" className="gap-unit-1 mb-5">
        <IconPlus size={16} />New Routine
      </Button>
      {routines.length > 0 ? (
        <RoutineCards routines={routines} />
      ) : (
        <p>No routines found.</p>
      )}
      <PageHeading title="Example Routines" />
    </>
  )
}
