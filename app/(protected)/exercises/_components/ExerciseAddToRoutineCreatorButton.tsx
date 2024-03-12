"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";
import { handleAddExerciseToRoutine } from "@/server-actions/RoutineServerActions";
import { toast } from "sonner";

export default function ExerciseAddToRoutineCreatorButton({
  exerciseId,
}: {
  exerciseId: string;
}) {
  const searchParams = useSearchParams();
  const routineId = searchParams.get("id");

  const handleClick = async () => {
    if (routineId) {
      const response = await handleAddExerciseToRoutine({
        exerciseId,
        routineId,
      });
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } else {
      console.error("routineId is null");
    }
  };

  return (
    <Button isIconOnly onClick={handleClick} aria-label="Add exercise to routine">
      <IconPlus className="hover:text-primary" size={20} />
    </Button>
  );
}
