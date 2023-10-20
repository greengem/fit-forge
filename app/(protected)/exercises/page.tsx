import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseTable from './ExerciseTable';

async function getExercises(){
  const exercises = await prisma.exercise.findMany({
    take: 10,
    select: {
      id: true,
      name: true,
      aliases: true,
      primary_muscles: true,
      secondary_muscles: true,
      force: true,
      level: true,
      mechanic: true,
      equipment: true,
      category: true,
      instructions: true,
      tips: true,
      imagePath: true
    }
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
