import { auth } from "@clerk/nextjs";
import { Suspense } from "react";
import prisma from "@/prisma/prisma";
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseFetch from "./_components/ExerciseFetch";
import ExerciseSearch from "./_components/ExerciseSearch";
import ExerciseFilterCategory from "./_components/ExerciseFilterCategory";
import ExerciseFilterMuscle from "./_components/ExerciseFilterMuscle";
import ExerciseFilterLevel from "./_components/ExerciseFilterDifficulty";
import ExerciseFilterForce from "./_components/ExerciseFilterForce";
import ExerciseTableSkeleton from "./_components/ExerciseTableSkeleton";
import ExerciseModal from "./_components/ExerciseModal";

interface UserRoutine {
  name: string;
  id: string;
}

export default async function ExercisesPage({ 
  searchParams 
} : { 
  searchParams?: {
    page?: number,
    search?: string,
    muscle?: string,
    cat?: string,
    level?: string,
    force?: string
  };
}) {
  const { userId } : { userId: string | null } = auth();

  if (!userId) {
      throw new Error('You must be signed in to view this page.');
  }

  const search = searchParams?.search || '';
  const cat = searchParams?.cat ? searchParams?.cat.split(',') : [];
  const muscle = searchParams?.muscle ? searchParams?.muscle.split(',') : [];
  const level = searchParams?.level ? searchParams?.level.split(',') : [];
  const force = searchParams?.force ? searchParams?.force.split(',') : [];
  const currentPage = Number(searchParams?.page) || 1;

  const userRoutines: (UserRoutine & { exerciseCount: number })[] = await prisma.workoutPlan.findMany({
    where: {
      userId: userId,
    },
    select: {
      name: true,
      id: true,
      WorkoutPlanExercise: true
    }
  }).then(routines => routines.map(routine => ({
    ...routine,
    exerciseCount: routine.WorkoutPlanExercise.length
  })));

  return (
    <>
      <PageHeading title="Exercises" />
      <div className="flex gap-3 mb-3">
        <ExerciseSearch />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <ExerciseFilterCategory />
        <ExerciseFilterMuscle />
        <ExerciseFilterLevel />
        <ExerciseFilterForce />
      </div>
      <Suspense 
        key={search + cat + muscle + level + force + currentPage} 
        fallback={<ExerciseTableSkeleton />}
      >
        <ExerciseFetch search={search} cat={cat} muscle={muscle} level={level} force={force} currentPage={currentPage} userRoutines={userRoutines} />
      </Suspense>
      <ExerciseModal />
    </>
  );
}
