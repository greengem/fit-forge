"use client";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: {
    completed: boolean;
    reps: number | null;
    duration: number | null;
    weight: number | null;
  }[];
  trackingType: string;
}

interface WorkoutDataContextType {
  workoutExercises: WorkoutExercise[] | null;
  setWorkoutExercises: Dispatch<SetStateAction<WorkoutExercise[] | null>>;
}

const defaultContextValue: WorkoutDataContextType = {
  workoutExercises: null,
  setWorkoutExercises: () => {},
};

const WorkoutDataContext =
  createContext<WorkoutDataContextType>(defaultContextValue);

export const WorkoutDataProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [workoutExercises, setWorkoutExercises] = useState<
    WorkoutExercise[] | null
  >(null);

  return (
    <WorkoutDataContext.Provider
      value={{ workoutExercises, setWorkoutExercises }}
    >
      {children}
    </WorkoutDataContext.Provider>
  );
};

export const useWorkoutData = () => useContext(WorkoutDataContext);
