import { Suspense } from "react";
import PageHeading from '@/components/PageHeading/PageHeading';
import ExerciseFetch from "./_components/ExerciseFetch";
import ExerciseSearch from "./_components/ExerciseSearch";
import ExerciseFilterCategory from "./_components/ExerciseFilterCategory";
import ExerciseFilterMuscle from "./_components/ExerciseFilterMuscle";
import ExerciseFilterLevel from "./_components/ExerciseFilterDifficulty";
import ExerciseFilterForce from "./_components/ExerciseFilterForce";
import ExerciseTableSkeleton from "./_components/ExerciseTableSkeleton";
import ExerciseModal from "./_components/ExerciseModal";

export default function ExercisesPage({ 
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
  const search = searchParams?.search || '';
  const cat = searchParams?.cat ? searchParams?.cat.split(',') : [];
  const muscle = searchParams?.muscle ? searchParams?.muscle.split(',') : [];
  const level = searchParams?.level ? searchParams?.level.split(',') : [];
  const force = searchParams?.force ? searchParams?.force.split(',') : [];
  const currentPage = Number(searchParams?.page) || 1;

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
        <ExerciseFetch search={search} cat={cat} muscle={muscle} level={level} force={force} currentPage={currentPage} />
      </Suspense>
      <ExerciseModal />
    </>
  );
}
