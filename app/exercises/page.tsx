import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseTable from './ExerciseTable';

async function getExercises(){
  const exercises = await prisma.exercise.findMany({
    take: 10
  });  
  return exercises;
}

export default async function ExercisesPage() {
  const exercises = await getExercises()

  return (
    <>
    <PageHeading title="Exercises" />
    <ExerciseTable exercises={exercises} />
  </>
  )
}
