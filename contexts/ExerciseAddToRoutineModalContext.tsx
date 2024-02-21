"use client";
import React, { ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Exercise } from "@prisma/client";

interface UserRoutine {
  id: string;
  name: string;
  exerciseCount: number;
}

interface ExerciseAddToRoutineModalContextType {
  exercise: Exercise | null;
  setExercise: (exercise: Exercise | null) => void;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
  userRoutines: UserRoutine[];
  setUserRoutines: (userRoutines: UserRoutine[]) => void;
}

export const ExerciseAddToRoutineModalContext =
  React.createContext<ExerciseAddToRoutineModalContextType>({
    exercise: null,
    setExercise: () => {},
    isOpen: false,
    onOpen: () => {},
    onOpenChange: () => {},
    userRoutines: [],
    setUserRoutines: () => {},
  });

// Create the provider
export function ExerciseAddToRoutineModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [userRoutines, setUserRoutines] = useState<UserRoutine[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <ExerciseAddToRoutineModalContext.Provider
      value={{
        exercise,
        setExercise,
        isOpen,
        onOpen,
        onOpenChange,
        userRoutines,
        setUserRoutines,
      }}
    >
      {children}
    </ExerciseAddToRoutineModalContext.Provider>
  );
}
