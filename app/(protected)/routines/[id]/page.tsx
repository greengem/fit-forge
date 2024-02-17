import { auth } from "@clerk/nextjs";
import getUserFavoriteExercises from "@/app/lib/getUserFavoriteExercises";
import PageHeading from '@/components/PageHeading/PageHeading';
import RoutineBuilder from './_components/RoutineBuilder';
import getRoutine from '@/app/lib/getRoutine';

export default async function NewRoutinePage({ params }: { params: { id: string } }) {
  const routineId = params.id;
  const { userId } : { userId: string | null } = auth();
  
  if (!userId) {
    throw new Error('You must be signed in to view this page.');
  }
  
  let existingRoutine;

  if (routineId !== 'new') {
    existingRoutine = await getRoutine(routineId);
  } else {
    existingRoutine = null;
  }

  const favoriteExercises = await getUserFavoriteExercises(userId);
  
  return (
    <>
      <PageHeading title="Create New Routine" />
      <RoutineBuilder existingRoutine={existingRoutine} routineId={routineId} favoriteExercises={favoriteExercises} />
    </>
  )
}
