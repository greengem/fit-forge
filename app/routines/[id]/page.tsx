import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { redirect } from "next/navigation";

import PageHeading from '@/components/PageHeading/PageHeading'
import RoutineBuilder from './RoutineBuilder'

export default async function NewRoutinePage({ params }: { params: { id: string } }) {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) redirect("/login");

  return (
    <>
      <PageHeading title="Create New Routine" />
      <RoutineBuilder routineId={params.id} />
    </>
  )
}
