'use client'
import React, { ReactNode, useState } from 'react';
import { useDisclosure } from "@nextui-org/use-disclosure";

// Define the Exercise type
type Exercise = {
  id: string;
  name: string;
  category: string;
  image: string | null;
  level: string;
  primary_muscles: string[];
  secondary_muscles: string[];
  equipment: string | null;
  force?: string;
  mechanic?: string;
  instructions?: string[];
  tips?: string[];
};


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
