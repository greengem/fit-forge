"use client";
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ExerciseCard from './ExerciseCard';
import StatusBar from './StatusBar';

export default function WorkoutManager({ workout }) {
    // Hook & Router Initializations
    const router = useRouter();
    const [exercises, setExercises] = useState(workout.WorkoutPlanExercise.map(exercise => ({
        sets: exercise.sets,
        completedSets: Array(exercise.sets).fill(false),
    })));
    const [workoutStartTime, setWorkoutStartTime] = useState(null);
    const [workoutDuration, setWorkoutDuration] = useState(0);
    const [weights, setWeights] = useState(workout.WorkoutPlanExercise.map(exercise => Array(exercise.sets).fill(40)));
    const [reps, setReps] = useState(workout.WorkoutPlanExercise.map(exercise => Array(exercise.sets).fill(exercise.reps)));
    const durationInterval = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    
    // Utility & Helper Functions
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - hours * 3600) / 60);
        const remainingSeconds = seconds - hours * 3600 - minutes * 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const togglePause = () => {
        if (!workoutStartTime) {
            setWorkoutStartTime(Date.now());
            toast.success('Workout Session Started!');
        } else {
            setIsPaused(prevIsPaused => !prevIsPaused);
            toast.success(isPaused ? 'Workout Resumed!' : 'Workout Paused!');
        }
    };
    
    // State Update Functions
    const addSet = (index, exerciseName) => {
        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises];
            updatedExercises[index].sets++;
            updatedExercises[index].completedSets.push(false);
            return updatedExercises;
        });
    
        setWeights(prevWeights => {
            const updatedWeights = [...prevWeights];
            updatedWeights[index].push(40);
            return updatedWeights;
        });
        setReps(prevReps => {
            const updatedReps = [...prevReps];
            updatedReps[index].push(workout.WorkoutPlanExercise[index].reps);
            return updatedReps;
        });
    
        toast.success(`Set added to ${exerciseName}`);
    };
    
    const removeSet = (index, exerciseName) => {
        if (window.confirm('Are you sure you want to delete this set?')) {
            setExercises(prevExercises => {
                const updatedExercises = [...prevExercises];
                if (updatedExercises[index].sets > 1) {
                    updatedExercises[index].sets--;
                    updatedExercises[index].completedSets.pop();
        
                    setWeights(prevWeights => {
                        const updatedWeights = [...prevWeights];
                        updatedWeights[index].pop();
                        return updatedWeights;
                    });
                    setReps(prevReps => {
                        const updatedReps = [...prevReps];
                        updatedReps[index].pop();
                        return updatedReps;
                    });
        
                    toast.success(`Set removed from ${exerciseName}`);
                    return updatedExercises;
                }
                toast.error(`Cannot remove. At least one set is required.`);
                return prevExercises;
            });
        }
    };
    
    const handleCompletion = (exerciseIndex, setIndex, exerciseName) => {
        if (!workoutStartTime) {
            startWorkout();
        }
        setExercises(prevExercises => {
            const updatedExercises = [...prevExercises];
            const currentState = updatedExercises[exerciseIndex].completedSets[setIndex];
            updatedExercises[exerciseIndex].completedSets[setIndex] = !currentState;
            if (!currentState) {
                toast.success(`${exerciseName} Set ${setIndex + 1} completed`);
            }
            return updatedExercises;
        });
    };
    
    const handleWeightChange = (exerciseIndex, setIndex, newValue) => {
        const updatedWeights = [...weights];
        updatedWeights[exerciseIndex][setIndex] = newValue;
        setWeights(updatedWeights);
    };
    
    const handleRepChange = (exerciseIndex, setIndex, newValue) => {
        const updatedReps = [...reps];
        updatedReps[exerciseIndex][setIndex] = newValue;
        setReps(updatedReps);
    };  

    // Async & Side Effect Functions
    const startWorkout = () => {
        if (!workoutStartTime) {
            setWorkoutStartTime(Date.now());
            toast.success('Workout Session Started!');
        }
    };

    useEffect(() => {
        if (workoutStartTime && !isPaused) {
            durationInterval.current = setInterval(() => {
                setWorkoutDuration(prevDuration => prevDuration + 1);
            }, 1000);
        } else if (isPaused && durationInterval.current) {
            clearInterval(durationInterval.current);
        }
    
        return () => {
            if (durationInterval.current) {
                clearInterval(durationInterval.current);
            }
        };
    }, [workoutStartTime, isPaused]);    

    async function fetchPBForExercise(exerciseId) {
        try {
            const response = await fetch(`/api/pbs/${exerciseId}`);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error(`Error fetching PB for exercise ${exerciseId}:`, error.message);
            return null;
        }
    }
    
    async function saveNewPB(exerciseId, weight, reps) {
        try {
            const response = await fetch('/api/pbs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    exerciseId,
                    weight,
                    reps
                })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
        } catch (error) {
            console.error(`Error saving PB for exercise ${exerciseId}:`, error.message);
        }
    }

    const completeWorkout = async () => {
        setIsSaving(true);
        const workoutPlanId = workout.id;
        const workoutExercises = exercises.map((exerciseState, index) => {
            const exerciseDetail = workout.WorkoutPlanExercise[index];
            return {
                exerciseId: exerciseDetail.Exercise.id,
                name: exerciseDetail.Exercise.name,
                sets: exerciseState.sets,
                reps: reps[index],
                weight: weights[index],                
                completed: exerciseState.completedSets
            };
        });
    
        try {
            const response = await fetch('/api/workouts/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: workoutName,
                    date: new Date().toISOString(),
                    duration: workoutDuration,
                    workoutPlanId,
                    exercises: workoutExercises
                })
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                toast.success('Workout saved successfully!');
                
                // Check and save any new PBs
                for (let i = 0; i < workoutExercises.length; i++) {
                    const exercise = workoutExercises[i];
                    const maxWeight = Math.max(...exercise.weight);
                    const validReps = exercise.reps.filter(Number.isFinite);
                    const maxReps = Math.max(...validReps);
                    const existingPB = await fetchPBForExercise(exercise.exerciseId);
    
                    if (existingPB === null || typeof existingPB.weight === 'undefined' || typeof existingPB.reps === 'undefined') {
                        // Save new PB if existing PB is not present or incomplete
                        await saveNewPB(exercise.exerciseId, maxWeight, maxReps);
                    } else {
                        // Compare and update PB if the new weight or reps are higher
                        if (maxWeight > existingPB.weight || maxReps > existingPB.reps) {
                            await saveNewPB(exercise.exerciseId, maxWeight, maxReps);
                        }
                    }
                }
    
                router.push("/dashboard");
                router.refresh();
            } else {
                toast.error('Failed to save workout. ' + responseData.message);
            }
        } catch (error) {
            toast.error('An error occurred while saving the workout: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };
    
    // Render-Related Calculations
    const workoutName = workout.name;
    const totalSets = exercises.reduce((acc, curr) => acc + curr.sets, 0);
    const completedSets = exercises.reduce((acc, curr) => acc + curr.completedSets.filter(set => set).length, 0);
    const progressPercentage = Math.round((completedSets / totalSets) * 100);

    return (
        <div className='pb-20'>            
            {workout.notes && <p className='mb-2'>Notes: {workout.notes}</p>}
            {workout.WorkoutPlanExercise.map((exerciseDetail, index) => (
                <ExerciseCard 
                    key={exerciseDetail.Exercise.id}
                    exerciseDetail={exerciseDetail} 
                    index={index}
                    exercises={exercises}
                    weights={weights}
                    reps={reps}
                    handleCompletion={handleCompletion}
                    handleWeightChange={handleWeightChange}
                    handleRepChange={handleRepChange}
                    addSet={addSet}
                    removeSet={removeSet}
                />
            ))}
            <StatusBar 
                workoutStartTime={workoutStartTime}
                isPaused={isPaused}
                togglePause={togglePause}
                completeWorkout={completeWorkout}
                formatDuration={formatDuration}
                workoutDuration={workoutDuration}
                progressPercentage={progressPercentage}
                isSaving={isSaving}
            />
        </div>
    );
}
