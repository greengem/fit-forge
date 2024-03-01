import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
import StepProgress from "../_components/StepProgress";
import RoutineBuilder from "./_components/RoutineBuilder";

export default async function NewRoutineFormStepTwo({
    searchParams,
}: {
  searchParams?: {
    id?: string;
  };
}) {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    const routineId = searchParams?.id || "";

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

    if (!routine) {
        throw new Error("No Routine found.");
    }

    return (
        <>
            <PageHeading title="New Routine - Step 3" />
            <h4>{routine?.name}</h4>
            {/* <StepProgress routineId={routineId} /> */}
            <div className="max-w-screen-sm mx-auto">
                <RoutineBuilder routine={routine} />
            </div>
        </>
    );
}
