import React from 'react';
import getExercises from '@/app/lib/getExercises';
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseList from './_components/ExerciseList';
import { Exercise } from '@prisma/client';

export default async function ExercisesPage() {
  const exercises: Exercise[] = await getExercises();

  return (
    <>
      <PageHeading title="Exercises" />
      <ExerciseList exercises={exercises} />
    </>
  );
}
