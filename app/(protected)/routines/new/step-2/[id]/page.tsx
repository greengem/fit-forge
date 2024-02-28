import PageHeading from "@/components/PageHeading/PageHeading";
import StepProgress from "../../_components/StepProgress";
import NewRoutineFormStepTwoClient from "./form.client";

export default async function NewRoutineFormStepTwo({ params } : { params: { id: string } }) {
    const routineId = params.id;

    return (
        <>
            <PageHeading title="New Routine Step 2" />
            <StepProgress />
            <NewRoutineFormStepTwoClient routineId={routineId} />
        </>
    );
}