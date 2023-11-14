import { createContext, useState, useContext, useEffect } from 'react';

const WorkoutDataContext = createContext({
  workoutExercises: null,
  setWorkoutExercises: () => {},
});

export const WorkoutDataProvider = ({ children }) => {
  // Initialize state from session storage
  const initialState = JSON.parse(sessionStorage.getItem('workoutExercises')) || null;
  const [workoutExercises, _setWorkoutExercises] = useState(initialState);

  // Update session storage when state changes
  useEffect(() => {
    sessionStorage.setItem('workoutExercises', JSON.stringify(workoutExercises));
  }, [workoutExercises]);

  // Custom setter function
  const setWorkoutExercises = (newExercises) => {
    _setWorkoutExercises(newExercises);
  };

  return (
    <WorkoutDataContext.Provider value={{ workoutExercises, setWorkoutExercises }}>
      {children}
    </WorkoutDataContext.Provider>
  );
};

export const useWorkoutData = () => useContext(WorkoutDataContext);
