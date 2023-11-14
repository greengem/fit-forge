// WorkoutControlsContext.js
import React, { createContext, useState, useContext, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const WorkoutControlsContext = createContext();

export const WorkoutControlsProvider = ({ children }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [workoutDuration, setWorkoutDuration] = useState(0);
  const [workoutStartTime, setWorkoutStartTime] = useState(null);
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState(null);

  const intervalRef = useRef(null);

  useEffect(() => {
    const handleWorkoutTimer = () => {
      if (workoutStartTime && !isPaused) {
        setWorkoutDuration(prevDuration => prevDuration + 1);
      }
    };

    if (workoutStartTime && !isPaused) {
      intervalRef.current = setInterval(handleWorkoutTimer, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [workoutStartTime, isPaused]);

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds - hours * 3600) / 60);
    const remainingSeconds = seconds - hours * 3600 - minutes * 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const togglePause = () => {
    if (!workoutStartTime) {
      toast.success('Workout Session Started from pause!');
    } else {
      setIsPaused(prevIsPaused => !prevIsPaused);
      toast.success(isPaused ? 'Workout Resumed!' : 'Workout Paused!');
    }
  };

  const startWorkout = (workoutId) => {
    if (!workoutStartTime) {
      setWorkoutStartTime(Date.now());
      setActiveWorkoutRoutine(workoutId);
      toast.success('Workout Session Started!');
    }
  };

  return (
    <WorkoutControlsContext.Provider value={{ 
      //States
      isPaused, setIsPaused, 
      isSaving, setIsSaving, 
      workoutDuration, setWorkoutDuration, 
      workoutStartTime, setWorkoutStartTime,
      activeWorkoutRoutine, setActiveWorkoutRoutine,
      //Functions
      formatDuration, togglePause, startWorkout,
    }}>
      {children}
    </WorkoutControlsContext.Provider>
  );
};

export const useWorkoutControls = () => {
  const context = useContext(WorkoutControlsContext);
  if (context === undefined) {
    throw new Error('useWorkoutControls must be used within a WorkoutControlsProvider');
  }
  return context;
};
