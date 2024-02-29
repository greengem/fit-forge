import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
import StepProgress from "../_components/StepProgress";
import ExerciseFilters from "@/app/(protected)/exercises/_components/Filters/ExerciseFilters";
import ExerciseFetch from "@/app/(protected)/exercises/_components/ExerciseFetch";
import ExerciseDetailModal from "@/app/(protected)/exercises/_components/Modals/ExerciseDetailModal/ExerciseDetailModal";
import { Button } from "@nextui-org/react";
import Link from "next/link";

export default async function NewRoutineFormStepTwo({
    searchParams,
}: {
  searchParams?: {
    id?: string;
    page?: number;
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
    const search = searchParams?.search || "";
    const cat = searchParams?.cat ? searchParams?.cat.split(",") : [];
    const muscle = searchParams?.muscle ? searchParams?.muscle.split(",") : [];
    const level = searchParams?.level ? searchParams?.level.split(",") : [];
    const force = searchParams?.force ? searchParams?.force.split(",") : [];
    const currentPage = Number(searchParams?.page) || 1;
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
        }
    });
    
    const selectedExercises = routine?.WorkoutPlanExercise.map(item => item.Exercise);

    return (
        <>
            <PageHeading title="New Routine - Step 2" />
            <h4>{routine?.name}</h4>
            <StepProgress routineId={routineId} />
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
                itemsPerPage={10}
                selectedExercises={selectedExercises}
            />
            <ExerciseDetailModal />
            <div className="flex justify-center gap-3 mb-3">
                <Button as={Link} href={`/edit-routine/step-1?id=${routineId}`}>Back</Button>
                <Button as={Link} href={`/edit-routine/step-3?id=${routineId}`}>Next</Button>
            </div>
            <div className="flex justify-center gap-3">
                <Button as={Link} href={`/workout`} color="danger">Cancel</Button>
            </div>
        </>
    );
}