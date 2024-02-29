import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import PageHeading from "@/components/PageHeading/PageHeading";
import StepProgress from "../_components/StepProgress";
import NewRoutineFormStepOneClient from "./form.client";

export default async function NewRoutineFormStepOne({
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

    const routineId = searchParams?.id || null;

    let routineName = "";
    let routineNotes = "";

    if (routineId !== null) {
        const routine = await prisma.workoutPlan.findUnique({
            where: {
                id: routineId,
            },
            select: {
                id: true,
                name: true,
                notes: true,
            }
        });
  
        routineName = routine?.name || "";
        routineNotes = routine?.notes || "";
    }

    return (
        <>
            <PageHeading title="New Routine Step 1" />
            <StepProgress routineId={routineId} />
            <NewRoutineFormStepOneClient
                routineId={routineId}
                routineName={routineName}
                routineNotes={routineNotes}
            />
        </>
    );
}