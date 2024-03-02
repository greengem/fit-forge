import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
import ExerciseFetch from "./_components/ExerciseFetch";
import ExerciseDetailModal from "./_components/Modals/ExerciseDetailModal/ExerciseDetailModal";
import ExerciseAddToRoutineModal from "./_components/Modals/ExerciseAddToRoutineModal";
import ExerciseFilters from "./_components/Filters/ExerciseFilters";

interface UserRoutine {
  name: string;
  id: string;
}

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams?: {
    page?: number;
    perPage?: number;
    search?: string;
    muscle?: string;
    cat?: string;
    level?: string;
    force?: string;
    favs?: string;
    equipmentOwned?: string;
  };
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const perPage = Number(searchParams?.perPage) || 5;
  const search = searchParams?.search || "";
  const cat = searchParams?.cat ? searchParams?.cat.split(",") : [];
  const muscle = searchParams?.muscle ? searchParams?.muscle.split(",") : [];
  const level = searchParams?.level ? searchParams?.level.split(",") : [];
  const force = searchParams?.force ? searchParams?.force.split(",") : [];
  const currentPage = Number(searchParams?.page) || 1;
  const favs = searchParams?.favs === "true";
  const equipmentOwned = searchParams?.equipmentOwned === "true";

  const userRoutines: (UserRoutine & { exerciseCount: number })[] =
    await prisma.workoutPlan
      .findMany({
        where: {
          userId: userId,
        },
        select: {
          name: true,
          id: true,
          WorkoutPlanExercise: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .then((routines) =>
        routines.map((routine) => ({
          ...routine,
          exerciseCount: routine.WorkoutPlanExercise.length,
        })),
      );

  return (
    <>
      <PageHeading title="Exercises" />
      <ExerciseFilters searchParams={searchParams} />
      {/* <Suspense 
        key={search + cat + muscle + level + force + currentPage} 
        fallback={<ExerciseTableSkeleton />}
      > */}
      <ExerciseFetch
        search={search}
        cat={cat}
        muscle={muscle}
        level={level}
        force={force}
        currentPage={currentPage}
        userRoutines={userRoutines}
        favs={favs}
        equipmentOwned={equipmentOwned}
        mode="exercisePage"
        perPage={perPage}
      />
      {/* </Suspense> */}
      <ExerciseDetailModal />
      <ExerciseAddToRoutineModal />
    </>
  );
}
