export type SearchResult = {
    id: string;
    name: string;
    category: string;
    image: string | null;
};

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
    order: number;
    trackingType: string;
    Exercise: Exercise;
};

export type ExistingRoutine = {
    id: string;
    name: string;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
    WorkoutPlanExercise: WorkoutPlanExercise[];
} | null;