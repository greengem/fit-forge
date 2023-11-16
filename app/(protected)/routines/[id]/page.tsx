import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import getUserFavoriteExercises from "@/app/lib/getUserFavoriteExercises";
import PageHeading from '@/components/PageHeading/PageHeading';
import RoutineBuilder from './_components/RoutineBuilder';

export default async function NewRoutinePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return <div>No user session available</div>;
  }

	const userId = session?.user?.id;
  const favoriteExercises = await getUserFavoriteExercises(userId);
  // Todo: Check if we are editing or creating a new routine by checking params
  // Fetch the routine we wish to edit here and pass it down
  return (
    <>
      <PageHeading title="Create New Routine" />
      <RoutineBuilder routineId={params.id} favoriteExercises={favoriteExercises} />
    </>
  )
}
