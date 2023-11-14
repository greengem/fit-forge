import { createContext, useState, useContext } from 'react';

const WorkoutDataContext = createContext({
  workoutExercises: null,
  setWorkoutExercises: () => {},
});

export const WorkoutDataProvider = ({ children }) => {
  const [workoutExercises, setWorkoutExercises] = useState(null);

  return (
    <WorkoutDataContext.Provider value={{ workoutExercises, setWorkoutExercises }}>
      {children}
    </WorkoutDataContext.Provider>
  );
};

export const useWorkoutData = () => useContext(WorkoutDataContext);
