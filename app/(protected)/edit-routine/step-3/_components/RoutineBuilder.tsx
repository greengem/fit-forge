"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleEditRoutine } from "@/server-actions/RoutineServerActions";
import SaveButton from "./SaveButton";
import { WorkoutPlanExercise, Routine } from "../NewRoutineTypes";
import RoutineExerciseCard from "./RoutineExerciseCard";
import { Reorder } from "framer-motion";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconPlayerTrackPrevFilled } from "@tabler/icons-react";

export default function RoutineBuilder({ routine }: { routine: Routine }) {
  const [selectedExercises, setSelectedExercises] = useState<
    WorkoutPlanExercise[]
  >(routine.WorkoutPlanExercise || []);
  const [isSaving, setIsSaving] = useState(false);

  const router = useRouter();

  const updateExercise = (
    index: number,
    field: string,
    value: number | string | null,
  ) => {
    const updatedExercises = [...selectedExercises];

    if (field === "trackingType") {
      if (value === "reps") {
        updatedExercises[index]["exerciseDuration"] = null;
      } else if (value === "duration") {
        updatedExercises[index]["reps"] = null;
      }
    }

    if (field in updatedExercises[index]) {
      (updatedExercises[index] as any)[field] = value;
    }
    setSelectedExercises(updatedExercises);
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const updatedExercises = [...selectedExercises];
    const temp = updatedExercises[index - 1];
    updatedExercises[index - 1] = updatedExercises[index];
    updatedExercises[index] = temp;
    setSelectedExercises(updatedExercises);
  };

  const moveDown = (index: number) => {
    if (index === selectedExercises.length - 1) return;
    const updatedExercises = [...selectedExercises];
    const temp = updatedExercises[index + 1];
    updatedExercises[index + 1] = updatedExercises[index];
    updatedExercises[index] = temp;
    setSelectedExercises(updatedExercises);
  };

  const deleteExercise = (index: number) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to remove this exercise?",
    );
    if (isConfirmed) {
      const updatedExercises = [...selectedExercises];
      updatedExercises.splice(index, 1);
      toast.success("Exercise removed");
      setSelectedExercises(updatedExercises);
    }
  };

  const validateForm = () => {
    if (selectedExercises.length === 0) {
      toast.error("At least one exercise is required.");
      return false;
    }

    for (let exercise of selectedExercises) {
      if (exercise.sets < 1) {
        toast.error(`${exercise.Exercise.name} should have at least 1 set.`);
        return false;
      }

      if (exercise.trackingType === "reps" && (exercise.reps ?? 0) < 1) {
        toast.error(`${exercise.Exercise.name} should have at least 1 rep.`);
        return false;
      }

      if (
        exercise.trackingType === "duration" &&
        (exercise.exerciseDuration ?? 0) <= 0
      ) {
        toast.error(
          `${exercise.Exercise.name} should have a duration greater than zero.`,
        );
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    const exercisesWithOrder = selectedExercises.map((exercise, index) => {
      const {
        Exercise: { id: exerciseId },
        sets,
        reps,
        exerciseDuration,
        trackingType,
      } = exercise;

      return {
        exerciseId,
        sets,
        reps,
        exerciseDuration,
        trackingType,
        order: index + 1,
      };
    });

    const routineId = routine.id;

    const data = { routineId, exercisesWithOrder };

    const response = await handleEditRoutine(data);
    if (response.success) {
      setIsSaving(false);
      toast.success(response.message);
      router.push("/workout");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Reorder.Group
        axis="y"
        values={selectedExercises}
        onReorder={setSelectedExercises}
        className="space-y-3 mb-3"
      >
        {selectedExercises.map((exercise, index) => (
          <Reorder.Item
            key={exercise.Exercise.id}
            value={exercise}
            className="relative touch-none"
          >
            <RoutineExerciseCard
              exercise={exercise}
              index={index}
              totalExercises={selectedExercises.length}
              updateExercise={updateExercise}
              moveUp={moveUp}
              moveDown={moveDown}
              deleteExercise={deleteExercise}
            />
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <div className="flex justify-center gap-3 mb-3">
        <Button
          variant="flat"
          as={Link}
          href={`/edit-routine/step-2?id=${routine.id}`}
        >
          <IconPlayerTrackPrevFilled size={18} /> Back
        </Button>
        <SaveButton handleSave={handleSave} isLoading={isSaving} />
      </div>
    </>
  );
}
