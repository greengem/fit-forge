import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import getExercises from '@/app/lib/getExercises';
import getUserFavoriteExercises from "@/app/lib/getUserFavoriteExercises";
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseList from './_components/ExerciseList';
import { Exercise } from '@/types/ExerciseType';

export default async function ExercisesPage() {
  const exercises: Exercise[] = await getExercises();
  const session = await getServerSession(authOptions);

  if (!session) {
    return <div>No user session available</div>;
  }

	const userId = session?.user?.id;
  const favoriteExercises = await getUserFavoriteExercises(userId);

  return (
    <>
      <PageHeading title="Exercises" />
      <ExerciseList exercises={exercises} favoriteExercises={favoriteExercises} />
    </>
  );
}
