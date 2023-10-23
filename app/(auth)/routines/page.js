import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getRoutines from '@/utils/getRoutines';
import RoutineCards from './_components/RoutineCards';
import PageHeading from '@/components/PageHeading/PageHeading';
import Link from 'next/link';
import { Button } from "@nextui-org/button";

export default async function RoutinesPage() {
  const session = await getServerSession(authOptions);
  const routines = await getRoutines(session.user.id);

  return (
    <>
      <PageHeading title="Routines" />
      <Button as={Link} href="/routines/new" color="success" className="mb-5">New Routine</Button>
      <RoutineCards routines={routines} />
    </>
  )
}
