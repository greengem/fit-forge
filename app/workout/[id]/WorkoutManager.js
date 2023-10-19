"use client";
import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ProgressBar from './ProgressBar';

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import {Input} from "@nextui-org/input";

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
    
    // Utility & Helper Functions
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds - hours * 3600) / 60);
        const remainingSeconds = seconds - hours * 3600 - minutes * 60;
        
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
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
        if (workoutStartTime) {
            durationInterval.current = setInterval(() => {
                setWorkoutDuration(prevDuration => prevDuration + 1);
            }, 1000);
        }
    
        return () => {
            if (durationInterval.current) {
                clearInterval(durationInterval.current);
            }
        };
    }, [workoutStartTime]);

    const completeWorkout = async () => {
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
                router.push("/dashboard");
                router.refresh();
            } else {
                toast.error('Failed to save workout. ' + responseData.message);
            }
        } catch (error) {
            toast.error('An error occurred while saving the workout: ' + error.message);
        }
    };

    // Render-Related Calculations
    const workoutName = workout.name;
    const totalSets = exercises.reduce((acc, curr) => acc + curr.sets, 0);
    const completedSets = exercises.reduce((acc, curr) => acc + curr.completedSets.filter(set => set).length, 0);
    const progressPercentage = Math.round((completedSets / totalSets) * 100);

    return (
        <>
            <Button 
                onClick={startWorkout} 
                disabled={!!workoutStartTime}
            >
                {workoutStartTime ? "Workout In Progress" : "Start Workout"}
            </Button>

            <div>Duration: {formatDuration(workoutDuration)}</div>
            <ProgressBar percentage={progressPercentage} />
            {workout.notes && <p>{workout.notes}</p>}
            {workout.WorkoutPlanExercise.map((exerciseDetail, index) => (
                <div key={exerciseDetail.Exercise.id} className='my-10'>
                    <h3 className="text-semibold text-2xl">{exerciseDetail.Exercise.name}</h3>
                    <Table aria-label={`Table for exercise ${exerciseDetail.Exercise.name}`} className="min-w-full table-auto mb-3">
                        <TableHeader>
                                <TableColumn>SET</TableColumn>
                                <TableColumn>KG</TableColumn>
                                <TableColumn>REPS</TableColumn>
                                <TableColumn>COMPLETE</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: exercises[index].sets }).map((_, setIndex) => (
                                <TableRow key={setIndex}>
                                    <TableCell>
                                        {setIndex + 1}
                                    </TableCell>
                                    <TableCell>
                                        <Input 
                                            type='number' 
                                            value={weights[index][setIndex]}
                                            onChange={e => handleWeightChange(index, setIndex, Number(e.target.value))}

                                            disabled={exercises[index].completedSets[setIndex]} 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Input 
                                            type="number" 
                                            value={reps[index][setIndex]}
                                            onChange={e => handleRepChange(index, setIndex, Number(e.target.value))}
                                            className="w-full p-1" 
                                            disabled={exercises[index].completedSets[setIndex]} 
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Button color='success' onClick={() => handleCompletion(index, setIndex, exerciseDetail.Exercise.name)}>
                                            {exercises[index].completedSets[setIndex] ? "Completed" : "Mark as Completed"}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className='flex gap-2'>
                        <Button onClick={() => addSet(index, exerciseDetail.Exercise.name)}>Add Set</Button>
                        <Button onClick={() => removeSet(index, exerciseDetail.Exercise.name)}>Remove Set</Button>
                    </div>
                </div>
            ))}
            <Button color='success' onClick={completeWorkout}>Save workout</Button>
        </>
    );
}
