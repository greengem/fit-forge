import getExercises from '@/app/lib/getExercises';
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseList from './_components/ExerciseList';

export default async function ExercisesPage() {
  const exercises = await getExercises()

  return (
    <>
    <PageHeading title="Exercises" />
    <ExerciseList exercises={exercises} />
  </>
  )
}
