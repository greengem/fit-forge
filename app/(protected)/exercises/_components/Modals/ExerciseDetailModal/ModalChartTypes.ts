export interface Set {
  id: string;
  workoutLogExerciseId: string;
  weight: number;
  reps: number;
  exerciseDuration?: number;
  order?: number;
}

export interface Exercise {
  id: string;
  workoutLogId: string;
  exerciseId: string;
  sets: Set[];
}

export interface WorkoutPlan {
  name: string;
}

export interface WorkoutLog {
  id: string;
  userId: string;
  workoutPlanId?: string | null;
  WorkoutPlan: WorkoutPlan;
  name: string;
  date: string;
  duration: number;
  createdAt: string;
  date_updated?: string | null;
  exercises: Exercise[];
}
