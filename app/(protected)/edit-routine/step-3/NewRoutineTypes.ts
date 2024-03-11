type Exercise = {
  id: string;
  name: string;
  category?: string;
  image?: string | null;
};

export type WorkoutPlanExercise = {
  sets: number;
  reps: number | null;
  exerciseDuration: number | null;
  order: number | null;
  trackingType: string;
  Exercise: Exercise;
};

export type Routine = {
  id: string;
  name: string;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  WorkoutPlanExercise: WorkoutPlanExercise[];
};
