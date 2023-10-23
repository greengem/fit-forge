import PageHeading from '@/components/PageHeading/PageHeading';
import RoutineBuilder from './_components/RoutineBuilder';

export default async function NewRoutinePage({ params }: { params: { id: string } }) {

  return (
    <>
      <PageHeading title="Create New Routine" />
      <RoutineBuilder routineId={params.id} />
    </>
  )
}
