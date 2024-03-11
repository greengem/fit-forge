export interface Exercise {
  id: string;
  name: string;
}

export interface WorkoutPlanExercise {
  Exercise: Exercise;
  sets: number;
  reps: number | null;
  exerciseDuration: number | null;
  trackingType: string;
  order: number;
}

export interface Workout {
  id: string;
  name: string;
  notes: string | null;
  WorkoutPlanExercise: WorkoutPlanExercise[];
}
