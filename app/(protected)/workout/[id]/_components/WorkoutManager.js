"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Card, CardBody, CardFooter, CardHeader, Chip, Button, ButtonGroup } from '@nextui-org/react';
import { IconPlus, IconX } from '@tabler/icons-react';

import { useWorkoutControls } from '@/contexts/WorkoutControlsContext';
import { useWorkoutData } from '@/contexts/WorkoutDataContext';

import ExerciseTable from './ExerciseTable';
import StatusBar from './StatusBar';

export default function WorkoutManager({ workout }) {
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const router = useRouter();
    const workoutPlanId = workout.id;
    const { workoutExercises, setWorkoutExercises } = useWorkoutData();
    const { 
        setIsSaving, 
        workoutDuration, setWorkoutDuration, 
        workoutStartTime, setWorkoutStartTime,
        activeWorkoutRoutine, setActiveWorkoutRoutine,
        startWorkout
    } = useWorkoutControls();

    // Populate our empty context state with the exercise data.
    useEffect(() => {
        if (!isDataLoaded && !activeWorkoutRoutine && workout) {
            const initialWorkoutExercises = workout.WorkoutPlanExercise.map(exerciseDetail => ({
                exerciseId: exerciseDetail.Exercise.id,
                exerciseName: exerciseDetail.Exercise.name,
                sets: Array.from({ length: exerciseDetail.sets }, (_, index) => ({
                    completed: false,
                    reps: exerciseDetail.reps || null,
                    duration: exerciseDetail.exerciseDuration || null,
                    weight: 0
                }))
            }));
            setWorkoutExercises(initialWorkoutExercises);
            setIsDataLoaded(true);
        }
    }, [workout, activeWorkoutRoutine, setWorkoutExercises, isDataLoaded]);

    // Add Sets to exercise
    const addSet = (exerciseIndex, exerciseName) => {
        setWorkoutExercises(prevWorkoutExercises => {
            const updatedWorkoutExercises = [...prevWorkoutExercises];
            const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
            const newSet = {
                completed: false,
                reps: workout.WorkoutPlanExercise[exerciseIndex].reps || null,
                duration: workout.WorkoutPlanExercise[exerciseIndex].exerciseDuration || null,
                weight: 0
            };
            exerciseToUpdate.sets = [...exerciseToUpdate.sets, newSet];
            updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
            toast.success(`Set added to ${exerciseName}`);
            return updatedWorkoutExercises;
        });
    };

    //Remove Sets from exercise
    const removeSet = (exerciseIndex, exerciseName) => {
        setWorkoutExercises(prevWorkoutExercises => {
            const updatedWorkoutExercises = [...prevWorkoutExercises];
            if (updatedWorkoutExercises[exerciseIndex].sets.length > 1) {
                if (window.confirm(`Are you sure you want to delete the last set from ${exerciseName}?`)) {
                    const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
                    exerciseToUpdate.sets.pop();
                    updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
                    toast.success(`Set removed from ${exerciseName}`);
                    return updatedWorkoutExercises;
                }
            } else {
                toast.error(`Cannot remove. At least one set is required for ${exerciseName}.`);
            }
            return prevWorkoutExercises;
        });
    };

    // Handle clicking complete set button
    const handleCompleteSet = (exerciseIndex, setIndex, exerciseName) => {
        if (!workoutStartTime) {
            startWorkout(workoutPlanId);
        }
        setWorkoutExercises(prevWorkoutExercises => {
            const updatedWorkoutExercises = [...prevWorkoutExercises];
            const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
            const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
            setToUpdate.completed = !setToUpdate.completed;
            exerciseToUpdate.sets[setIndex] = setToUpdate;
            updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
            if (!setToUpdate.completed) {
                toast.success(`${exerciseName} Set ${setIndex + 1} completed`);
            }
            return updatedWorkoutExercises;
        });
    };

    // Handle changing weight for a set
    const handleWeightChange = (exerciseIndex, setIndex, newValue) => {
        setWorkoutExercises(prevWorkoutExercises => {
            const updatedWorkoutExercises = [...prevWorkoutExercises];
            const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
            const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
            setToUpdate.weight = newValue;
            exerciseToUpdate.sets[setIndex] = setToUpdate;
            updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
            return updatedWorkoutExercises;
        });
    };

    // Handle changing reps for a set
    const handleRepChange = (exerciseIndex, setIndex, newValue) => {
        setWorkoutExercises(prevWorkoutExercises => {
            const updatedWorkoutExercises = [...prevWorkoutExercises];
            const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
            const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
            setToUpdate.reps = newValue;
            exerciseToUpdate.sets[setIndex] = setToUpdate;
            updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
            return updatedWorkoutExercises;
        });
    };

    //Handle changing exerciseDuration for a set
    const handleDurationChange = (exerciseIndex, setIndex, newValue) => {
        setWorkoutExercises(prevWorkoutExercises => {
            const updatedWorkoutExercises = [...prevWorkoutExercises];
            const exerciseToUpdate = { ...updatedWorkoutExercises[exerciseIndex] };
            const setToUpdate = { ...exerciseToUpdate.sets[setIndex] };
            setToUpdate.duration = newValue;
            exerciseToUpdate.sets[setIndex] = setToUpdate;
            updatedWorkoutExercises[exerciseIndex] = exerciseToUpdate;
            return updatedWorkoutExercises;
        });
    };

    // Cancel workout and reset states
    const cancelWorkout = () => {
        if (window.confirm('Are you sure you want to cancel the workout? No data will be saved.')) {
            setWorkoutExercises([]);
            setWorkoutDuration(0);
            setWorkoutStartTime(null);
            setActiveWorkoutRoutine(null);
            toast('Workout cancelled');
            router.push('/workout');
        }
    };

    // Save the workout
    const completeWorkout = async () => {
    
        // Validate if at least one set has been completed.
        const atLeastOneSetCompleted = workoutExercises.some(exercise => 
            exercise.sets.some(set => set.completed));
        if (!atLeastOneSetCompleted) {
            toast.error('You need to complete at least one set to save the workout.');
            return;
        }

        // Warn user if any sets are not completed before saving
        const incompleteSetsExist = workoutExercises.some(exercise => 
            exercise.sets.some(set => !set.completed));
        if (incompleteSetsExist) {
            if(!window.confirm('There are incomplete sets. These will not be saved. Do you want to proceed?')) {
                return;
            }
        }

        setIsSaving(true);

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
                    exercises: workoutExercises.map(exercise => ({
                        exerciseId: exercise.exerciseId,
                        sets: exercise.sets.map(set => ({
                            reps: set.reps,
                            weight: set.weight,
                            duration: set.duration,
                            completed: set.completed
                        }))
                    }))
                })
            });
    
            const responseData = await response.json();
            console.log("Response from the API:", responseData);

            if (response.ok) {
                router.push("/dashboard");
                router.refresh();
                setWorkoutExercises([]);
                setWorkoutDuration(0);
                setWorkoutStartTime(null);
                setActiveWorkoutRoutine(null);
                toast.success('Workout saved successfully!');
            } else {
                toast.error('Failed to save workout. ' + responseData.message);
            }
        } catch (error) {
            console.error("Error making the API request:", error);
            toast.error('An error occurred while saving the workout: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };
    
    const workoutName = workout.name;

    // Completion Percentage Calculator
    const totalSets = workoutExercises
    ? workoutExercises.reduce((acc, curr) => acc + curr.sets.length, 0)
    : 0;

    const completedSets = workoutExercises
        ? workoutExercises.reduce((acc, curr) => 
            acc + curr.sets.filter(set => set.completed).length, 0)
        : 0;

    const progressPercentage = totalSets > 0 
        ? Math.round((completedSets / totalSets) * 100)
        : 0;


    return (
<div className='pb-40'>
        {workout.notes && <Chip color='success' className='mb-3'>Notes: {workout.notes}</Chip>}
        <div className='space-y-5'>
            {workoutExercises?.map((exercise, index) => (
                <Card shadow="none" className="shadow-md" key={exercise.exerciseId}>
                    <CardHeader className='text-lg px-5'>
                        {exercise.exerciseName}
                    </CardHeader>
                    <CardBody className='pb-1 pt-0'>
                        <ExerciseTable 
                            exerciseDetail={exercise}
                            index={index}
                            handleCompleteSet={handleCompleteSet}
                            handleWeightChange={handleWeightChange}
                            handleRepChange={handleRepChange}
                            handleDurationChange={handleDurationChange}
                            addSet={addSet}
                            removeSet={removeSet}
                        />
                    </CardBody>
                    <CardFooter className='gap-2 px-5 bg-default-100'>
                        <ButtonGroup>
                            <Button className='gap-unit-1' size='sm' onPress={() => addSet(index, exercise.exerciseName)}>
                                <IconPlus size={16} />Add Set
                            </Button>
                            <Button className='gap-unit-1' size='sm' onPress={() => removeSet(index, exercise.exerciseName)}>
                                <IconX size={16} />Remove Set
                            </Button>
                        </ButtonGroup>
                    </CardFooter>
                </Card>
            ))}
        </div>
        <StatusBar 
            completeWorkout={completeWorkout}
            progressPercentage={progressPercentage}
            activeRoutineId={workoutPlanId}
            cancelWorkout={cancelWorkout}
        />
</div>

    );
    
}
