"use client";
import React, { ReactNode, useState } from "react";
import { useDisclosure } from "@nextui-org/use-disclosure";
import { TrackingType } from "@prisma/client";

interface Set {
  weight: number | null;
  reps: number | null;
  exerciseDuration: number | null;
}

interface Exercise {
  id: string;
  exerciseId: string;
  Exercise: {
    name: string;
  };
  sets: Set[];
  trackingType: TrackingType;
}

interface WorkoutPlan {
  name: string;
}

interface Activity {
  id: string;
  duration: number;
  date: Date;
  WorkoutPlan: WorkoutPlan;
  exercises: Exercise[];
}

interface ActivityModalContextProps {
  activity: Activity | null;
  setActivity: (activity: Activity | null) => void;
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

export const ActivityModalContext =
  React.createContext<ActivityModalContextProps>({
    activity: null,
    setActivity: () => {},
    isOpen: false,
    onOpen: () => {},
    onOpenChange: () => {},
  });

// Create the provider
export function ActivityModalProvider({ children }: { children: ReactNode }) {
  const [activity, setActivity] = useState<Activity | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <ActivityModalContext.Provider
      value={{ activity, setActivity, isOpen, onOpen, onOpenChange }}
    >
      {children}
    </ActivityModalContext.Provider>
  );
}
