'use client'
import React, { ReactNode, useState } from 'react';
import { useDisclosure } from "@nextui-org/use-disclosure";
import { Exercise } from "@prisma/client";


// Define the context value type
interface ExerciseModalContextType {
  exercise: Exercise | null;
  setExercise: (exercise: Exercise | null) => void;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}


export const ExerciseModalContext = React.createContext<ExerciseModalContextType>({
  exercise: null,
  setExercise: () => {},
  isOpen: false,
  onOpen: () => {},
  onOpenChange: () => {},
});

// Create the provider
export function ExerciseModalProvider({ children }: { children: ReactNode }) {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <ExerciseModalContext.Provider value={{ exercise, setExercise, isOpen, onOpen, onOpenChange }}>
      {children}
    </ExerciseModalContext.Provider>
  );
};
