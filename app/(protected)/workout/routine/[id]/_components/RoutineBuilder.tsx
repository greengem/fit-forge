"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleCreateRoutine, handleEditRoutine } from "@/server-actions/RoutineServerActions";

import { Button } from "@nextui-org/react";
import RoutineDetails from "./RoutineDetails";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import ExerciseTable from "./ExerciseTable";
import SaveButton from "./SaveButton";
import { SearchResult, WorkoutPlanExercise, ExistingRoutine } from "../NewRoutineTypes";

type RoutineBuilderProps = {
  existingRoutine: ExistingRoutine;
  routineId: string;
  searchResults: SearchResult[];
};

export default function RoutineBuilder({
  existingRoutine,
  routineId,
  searchResults,
}: RoutineBuilderProps) {
  const [selectedExercises, setSelectedExercises] = useState<WorkoutPlanExercise[]>(existingRoutine ? existingRoutine.WorkoutPlanExercise || [] : []);
  const [routineName, setRoutineName] = useState(existingRoutine ? existingRoutine.name : "");
  const [notes, setNotes] = useState(existingRoutine ? existingRoutine.notes || "" : "");
  const [isSaving, setIsSaving] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const addExerciseToRoutine = (exercise: SearchResult) => {
    const defaultReps = 8;
  
    const newExercise = {
      sets: 1,
      reps: defaultReps,
      exerciseDuration: null,
      order: selectedExercises.length + 1,
      trackingType: "reps",
      Exercise: {
        id: exercise.id,
        name: exercise.name,
        category: exercise.category,
      },
    };
    setSelectedExercises([...selectedExercises, newExercise]);  
    router.replace(pathname, { scroll: false });
    router.refresh();
  };

  const updateExercise = (index: number, field: string, value: number | string | null) => {
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
    toast.success("Exercise moved up");
    setSelectedExercises(updatedExercises);
  };

  const moveDown = (index: number) => {
    if (index === selectedExercises.length - 1) return;
    const updatedExercises = [...selectedExercises];
    const temp = updatedExercises[index + 1];
    updatedExercises[index + 1] = updatedExercises[index];
    updatedExercises[index] = temp;
    toast.success("Exercise moved down");
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
    if (!routineName.trim()) {
      toast.error("Routine Name is required.");
      return false;
    }

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
      const { Exercise: { id: exerciseId }, sets, reps, exerciseDuration, trackingType } = exercise;

      return {
        exerciseId, sets, reps, exerciseDuration, trackingType, order: index + 1,
      };
    });

    const data = {routineName, routineId, notes, exercisesWithOrder};

    if (routineId === "new") {
      const response = await handleCreateRoutine(data);
      if (response.success) {
        setIsSaving(false);
        toast.success(response.message);
        router.push("/workout");
      } else {
        toast.error(response.message);
      }
    } else {
      const response = await handleEditRoutine(data);
      if (response.success) {
        setIsSaving(false);
        toast.success(response.message);
        router.push("/workout");
      } else {
        toast.error(response.message);
      }
    }
  }

  return (
    <>
      <RoutineDetails
        routineName={routineName}
        setRoutineName={setRoutineName}
        notes={notes}
        setNotes={setNotes}
      />
      <SearchBar />
      {searchResults.length > 0 && <SearchResults searchResults={searchResults} addExerciseToRoutine={addExerciseToRoutine} />}
      
        <ExerciseTable
          selectedExercises={selectedExercises}
          updateExercise={updateExercise}
          moveUp={moveUp}
          moveDown={moveDown}
          deleteExercise={deleteExercise}
        />
        
      <SaveButton handleSave={handleSave} isLoading={isSaving} />
    </>
  );
}
