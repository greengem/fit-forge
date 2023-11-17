import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import getUserFavoriteExercises from "@/app/lib/getUserFavoriteExercises";
import PageHeading from '@/components/PageHeading/PageHeading';
import RoutineBuilder from './_components/RoutineBuilder';
import getRoutine from '@/app/lib/getRoutine';

export default async function NewRoutinePage({ params }: { params: { id: string } }) {
  const routineId = params.id;
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>No user session available</div>;
  }

  const userId = session?.user?.id;
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
