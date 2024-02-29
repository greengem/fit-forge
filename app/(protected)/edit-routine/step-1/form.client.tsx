'use client'
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Input, Textarea } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { handleCreateRoutineStepOne } from "@/server-actions/RoutineServerActions";
import Link from "next/link";

export default function NewRoutineFormStepOneClient({ routineId, routineName, routineNotes } : { routineId: string | null, routineName: string, routineNotes: string }){
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        if (routineId) {
            formData.append('routineId', routineId);
        }
        const response = await handleCreateRoutineStepOne(formData, routineId);
        if (response.success) {
            console.log('Created routine ID:', response.newRoutineId);
            router.push(`/edit-routine/step-2?id=${response.newRoutineId}`);
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
                defaultValue={routineName}
            />
            <Textarea
                name="routineNotes"
                size="sm"
                placeholder="Workout notes..."
                label="Notes"
                defaultValue={routineNotes}
            />
            <div className="flex justify-center">
                <Button type="submit">Next</Button>
            </div>
            <div className="flex justify-center gap-3">
                <Button as={Link} href={`/workout`} color="danger">Cancel</Button>
            </div>
        </form>
    );
}