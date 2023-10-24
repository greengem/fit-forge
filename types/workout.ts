// types/workout.ts

export interface Set {
  weight: number;
  reps: number;
}

export interface Exercise {
  id: string;
  exerciseId: string;
  Exercise: {
    name: string;
  };
  sets: Array<Set>;
}

export interface Workout {
  id: string;
  name: string;
  duration: number;
  createdAt: Date;
  exercises: Array<Exercise>;
}
