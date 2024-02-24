"use client";
import { useState } from "react";
import RoutineCard from "./RoutineCard";
import { useWorkoutControls } from "@/contexts/WorkoutControlsContext";
import { WorkoutPlan } from "@prisma/client";

type Exercise = {
  id: string;
  name: string;
  category: string;
};

type WorkoutPlanExercise = {
  Exercise: Exercise;
  order: number;
  sets: number;
};

type ExtendedWorkoutPlan = WorkoutPlan & {
  WorkoutPlanExercise: WorkoutPlanExercise[];
};

type RoutineCardsProps = {
  routines: ExtendedWorkoutPlan[];
  isSystem: boolean;
};

type ExpandedRoutines = {
  [routineId: string]: boolean;
};

export default function RoutineCards({ routines, isSystem } : RoutineCardsProps) {

  const { activeWorkoutRoutine } = useWorkoutControls();

  return (
    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {routines.map((routine) => (
        <RoutineCard
          key={routine.id}
          routine={routine}
          isSystem={isSystem}
          activeWorkoutRoutine={activeWorkoutRoutine}
        />
      ))}
    </div>
  );
}