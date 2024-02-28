'use client'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { handleCreateRoutineStepOne } from "@/server-actions/RoutineServerActions";

export default function NewRoutineFormStepTwoClient({ routineId } : { routineId: string }){
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const response = await handleCreateRoutineStepOne(formData);
        if (response.success) {
            console.log('Created routine ID:', response.routineId);
            router.push(`/routines/new/step-2/${response.routineId}`);
          } else {
            toast.error(response.message);
          }
    };

    return (
            <form className="space-y-3" onSubmit={handleSubmit}>
                <Input
                    name="routineName"
                    size="sm"
                    placeholder="My Workout Plan..."
                    label="Routine Name"
                    isRequired
                />
                <Textarea
                    name="routineNotes"
                    size="sm"
                    placeholder="Workout notes..."
                    label="Notes"
                />
                <div className="flex justify-center">
                    <Button type="submit">Next</Button>
                </div>
            </form>
    );
}