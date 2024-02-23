interface WorkoutPlanExerciseBase {
  exerciseId: string;
  sets: number;
  order: number;
  trackingType: 'reps' | 'duration';
}

interface WorkoutPlanExerciseReps extends WorkoutPlanExerciseBase {
  reps: number;
  duration?: never;
}

interface WorkoutPlanExerciseDuration extends WorkoutPlanExerciseBase {
  reps?: never;
  duration: number;
}

type WorkoutPlanExercise = WorkoutPlanExerciseReps | WorkoutPlanExerciseDuration;

interface WorkoutPlanInput {
  name: string;
  notes: string;
  systemRoutineCategory: string;
  WorkoutPlanExercises: WorkoutPlanExercise[];
}

export const predefinedWorkouts: WorkoutPlanInput[] = [

  // Strength

  {
    name: 'Full-Body Strength Builder',
    systemRoutineCategory: 'Strength',
    notes: 'This workout is designed to target all major muscle groups, providing a solid foundation of strength. Perfect for those looking to improve overall strength and endurance.',
    WorkoutPlanExercises: [
      {
        exerciseId: '4ba75032-bdee-4369-a007-3346dd26f4fa', // Barbell Squat
        sets: 3, reps: 8, order: 1, trackingType: 'reps',
      },
      {
        exerciseId: '6792b0e8-d064-4da6-953e-b7593f30ce80', // Barbell Bench Press - Medium Grip
        sets: 3, reps: 8, order: 2, trackingType: 'reps',
      },
      {
        exerciseId: '02c17c80-8a7f-4213-a8a7-500b1f4c4e9f', // Barbell Deadlift
        sets: 3, reps: 8, order: 3, trackingType: 'reps',
      },
      {
        exerciseId: '8fdd5051-eb06-4ff9-b477-54254a34d43a', // Wide-Grip Lat Pulldown
        sets: 3, reps: 8, order: 4, trackingType: 'reps',
      },
      {
        exerciseId: '449e4f68-95c8-40a5-acde-cc76c36d8604', // Machine Shoulder (Military) Press
        sets: 3, reps: 8, order: 5, trackingType: 'reps',
      },
      {
        exerciseId: '0fef6129-ee7f-4395-ab16-bd42e3b059f1', // Plank
        sets: 3, duration: 30, order: 6, trackingType: 'duration',
      },
    ],
  },
  {
    name: 'Upper Body Power',
    systemRoutineCategory: 'Strength',
    notes: 'Focus on building strength in the chest, back, shoulders, and arms. Ideal for those wanting to increase upper body power and muscular definition.',
    WorkoutPlanExercises: [
      {
        exerciseId: '6792b0e8-d064-4da6-953e-b7593f30ce80', // Barbell Bench Press - Medium Grip
        sets: 4, reps: 6, order: 1, trackingType: 'reps',
      },
      {
        exerciseId: '6fb8da54-38fb-408d-951d-4b4a696b5a98', // Bent Over Barbell Row
        sets: 4, reps: 6, order: 2, trackingType: 'reps',
      },
      {
        exerciseId: 'd7aba9b7-1466-4aec-95f9-bd96707d1c63', // Dumbbell Shoulder Press
        sets: 3, reps: 8, order: 3, trackingType: 'reps',
      },
      {
        exerciseId: '6988bd28-62fa-4d77-9df4-3eebcb960c20', // Pullups
        sets: 3, reps: 10, order: 4, trackingType: 'reps',
      },
      {
        exerciseId: 'd8075b69-ab08-41c9-9a30-1d7ef58e5059', // Dumbbell Bicep Curl
        sets: 3, reps: 10, order: 5, trackingType: 'reps',
      },
      {
        exerciseId: 'b72ab6ab-fed4-4a3a-808c-1616be7f9f37', // Dips - Triceps Version
        sets: 3, reps: 10, order: 6, trackingType: 'reps',
      },
    ],
  },
  {
    name: 'Lower Body Blast',
    systemRoutineCategory: 'Strength',
    notes: 'A comprehensive lower body workout aimed at strengthening and toning the legs and glutes. Great for building power and endurance.',
    WorkoutPlanExercises: [
      {
        exerciseId: '4ba75032-bdee-4369-a007-3346dd26f4fa', // Barbell Squat
        sets: 4, reps: 8, order: 1, trackingType: 'reps',
      },
      {
        exerciseId: '02c17c80-8a7f-4213-a8a7-500b1f4c4e9f', // Barbell Deadlift
        sets: 4, reps: 8, order: 2, trackingType: 'reps',
      },
      {
        exerciseId: '8b7aa481-75d3-463d-8e8d-642452622892', // Dumbbell Lunges
        sets: 3, reps: 10, order: 3, trackingType: 'reps',
      },
      {
        exerciseId: 'f72b7d1f-183c-4ec4-9d41-6963eb300e52', // Leg Press
        sets: 3, reps: 10, order: 4, trackingType: 'reps',
      },
      {
        exerciseId: '00a8d01d-f9b9-4dba-bbba-3f341e873dec', // Standing Dumbbell Calf Raise
        sets: 3, reps: 15, order: 5, trackingType: 'reps',
      },
    ],
  },
  {
    name: 'Core Stability and Strength',
    systemRoutineCategory: 'Strength',
    notes: 'This routine is centered around building core muscle strength and stability, which is essential for overall fitness and injury prevention.',
    WorkoutPlanExercises: [
      {
        exerciseId: '0fef6129-ee7f-4395-ab16-bd42e3b059f1', // Plank
        sets: 3, duration: 30, order: 1, trackingType: 'duration',
      },
      {
        exerciseId: '611a7088-465e-4c57-8f7b-43f3e271b485', // Standing Cable Wood Chop
        sets: 3, reps: 12, order: 2, trackingType: 'reps',
      },
      {
        exerciseId: '0bb417f9-8637-4ca3-bb2b-d20d48993e2e', // Russian Twist
        sets: 3, reps: 15, order: 3, trackingType: 'reps',
      },
      {
        exerciseId: '73c69ac7-d456-429e-a224-4a906ae791e0', // Cross-Body Crunch
        sets: 3, reps: 20, order: 4, trackingType: 'reps',
      },
      {
        exerciseId: 'a6373002-94c0-4218-a5a5-148f8ee848dc', // Hanging Leg Raise
        sets: 3, reps: 10, order: 5, trackingType: 'reps',
      },
    ],
  },

  // Cardio

  // Flexibility


  // Weight Loss
  

  // Beginner

];