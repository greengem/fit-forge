import PageHeading from '@/components/PageHeading/PageHeading';
import RoutineBuilder from './_components/RoutineBuilder';

export default async function NewRoutinePage({ params }: { params: { id: string } }) {
  // Todo: Check if we are editing or creating a new routine by checking params
  // Fetch the routine we wish to edit here and pass it down
  return (
    <>
      <PageHeading title="Create New Routine" />
      <RoutineBuilder routineId={params.id} />
    </>
  )
}
