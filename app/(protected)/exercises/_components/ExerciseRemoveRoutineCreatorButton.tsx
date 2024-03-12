"use client";
import { useSearchParams } from "next/navigation";
import { Button } from "@nextui-org/button";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { handleRemoveExerciseFromRoutine } from "@/server-actions/RoutineServerActions";
import { toast } from "sonner";

export default function ExerciseRemoveRoutineCreatorButton({
  exerciseId,
}: {
  exerciseId: string;
}) {
  const searchParams = useSearchParams();
  const routineId = searchParams.get("id");

  const handleClick = async () => {
    if (routineId) {
      const response = await handleRemoveExerciseFromRoutine({
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
    <Button isIconOnly onClick={handleClick} aria-label="Remove Exercise from routine">
      <IconMinus className="text-danger" size={20} />
    </Button>
  );
}
