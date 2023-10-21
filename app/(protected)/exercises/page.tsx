import getExercises from '@/utils/getExercises';
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseTable from './ExerciseTable';

export default async function ExercisesPage() {
  const exercises = await getExercises()

  return (
    <>
    <PageHeading title="Exercises" />
    <ExerciseTable exercises={exercises} />
  </>
  )
}
