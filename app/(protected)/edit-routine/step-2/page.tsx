import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
import StepProgress from "../_components/StepProgress";
import ExerciseFilters from "@/app/(protected)/exercises/_components/Filters/ExerciseFilters";
import ExerciseFetch from "@/app/(protected)/exercises/_components/ExerciseFetch";
import ExerciseDetailModal from "@/app/(protected)/exercises/_components/Modals/ExerciseDetailModal/ExerciseDetailModal";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconPlayerTrackNextFilled, IconX } from "@tabler/icons-react";
import { IconPlayerTrackPrevFilled } from "@tabler/icons-react";

export default async function NewRoutineFormStepTwo({
  searchParams,
}: {
  searchParams?: {
    id?: string;
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

  const routineId = searchParams?.id || "";

  if (!routineId) {
    throw new Error("Routine ID is required.");
  }

  const currentPage = Number(searchParams?.page) || 1;
  const perPage = Number(searchParams?.perPage) || 10;
  const search = searchParams?.search || "";
  const cat = searchParams?.cat ? searchParams?.cat.split(",") : [];
  const muscle = searchParams?.muscle ? searchParams?.muscle.split(",") : [];
  const level = searchParams?.level ? searchParams?.level.split(",") : [];
  const force = searchParams?.force ? searchParams?.force.split(",") : [];
  const favs = searchParams?.favs === "true";
  const equipmentOwned = searchParams?.equipmentOwned === "true";

  const routine = await prisma.workoutPlan.findUnique({
    where: {
      id: routineId,
    },
    include: {
      WorkoutPlanExercise: {
        include: {
          Exercise: true,
        },
      },
    },
  });

  const selectedExercises = routine?.WorkoutPlanExercise.map(
    (item) => item.Exercise,
  );

  return (
    <>
      <PageHeading title="New Routine - Step 2" />
      <p className="text-zinc-600 dark:text-zinc-400 mb-3 text-sm">
        Choose Exercises: Use search and filters to find exercises. Click
        &apos;i&apos; for details, star to favorite, and plus to add to your
        routine.
      </p>
      <ExerciseFilters searchParams={searchParams} />
      <ExerciseFetch
        search={search}
        cat={cat}
        muscle={muscle}
        level={level}
        force={force}
        currentPage={currentPage}
        favs={favs}
        equipmentOwned={equipmentOwned}
        mode="createRoutine"
        perPage={perPage}
        selectedExercises={selectedExercises}
      />
      <ExerciseDetailModal />
      <div className="flex justify-center gap-3 mt-3">
        <Button
          variant="flat"
          as={Link}
          href={`/edit-routine/step-1?id=${routineId}`}
        >
          <IconPlayerTrackPrevFilled size={18} /> Back
        </Button>
        <Button
          variant="flat"
          as={Link}
          href={`/edit-routine/step-3?id=${routineId}`}
          isDisabled={!selectedExercises || selectedExercises.length === 0}
        >
          Next <IconPlayerTrackNextFilled size={18} />
        </Button>
      </div>
    </>
  );
}
