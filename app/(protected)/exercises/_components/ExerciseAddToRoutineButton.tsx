"use client";
import { useContext } from "react";
import { ExerciseAddToRoutineModalContext } from "@/contexts/ExerciseAddToRoutineModalContext";
import { Exercise } from "@prisma/client";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";

interface UserRoutine {
  id: string;
  name: string;
  exerciseCount: number;
}

type ExerciseAddToRoutineButtonProps = {
  exercise: Exercise;
  userRoutines?: UserRoutine[];
};

export default function ExerciseAddToRoutineButton({
  exercise,
  userRoutines,
}: ExerciseAddToRoutineButtonProps) {
  const { setExercise, setUserRoutines, onOpen } = useContext(
    ExerciseAddToRoutineModalContext,
  );

  const handleClick = () => {
    setExercise(exercise);
    userRoutines && setUserRoutines(userRoutines);
    onOpen();
  };

  return (
    <Button isIconOnly onClick={handleClick} aria-label="Add exercise to routine">
      <IconPlus className="hover:text-primary" size={20} />
    </Button>
  );
}
