"use client";
import React from 'react';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Image } from '@nextui-org/react';
import NextImage from "next/image";
import ExerciseTable from "@/app/(auth)/activity/ExerciseTable";
import DeleteButton from "@/app/(auth)/activity/DeleteButton";
import { Workout } from '@/types';

function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
}

interface WorkoutCardsProps {
    workouts: Workout[];
    showDeleteButton: boolean;
}

const WorkoutCards: React.FC<WorkoutCardsProps> = ({ workouts, showDeleteButton }) => {
    return (
        <>
            {workouts.map((workout) => {
                const totalWeightLifted = workout.exercises.reduce((acc, exercise) => {
                    return acc + exercise.sets.reduce((acc, set) => acc + set.weight, 0);
                }, 0);
                return (
                        <Card key={workout.id} className='h-full'>
                            <CardHeader className="flex gap-3 px-5">
                                <Image
                                    as={NextImage}
                                    alt="Barbell Icon"
                                    height={40}
                                    radius="sm"
                                    src="/icons/barbell-darkmode.svg"
                                    width={40}
                                />
                                <div className="flex flex-col">
                                    <p className="text-md">{workout.name}</p>
                                    <p className="text-small text-default-500">{formatDuration(workout.duration)} | {totalWeightLifted} KG</p>
                                </div>
                            </CardHeader>
                            <CardBody className="py-0 pb-2">
                                <ExerciseTable workoutLogExercises={workout.exercises} workoutName={workout.name} workoutDate={workout.createdAt} />
                            </CardBody>
                            {showDeleteButton && (
                            <CardFooter className="px-5">
                                <DeleteButton id={workout.id} />
                            </CardFooter>
                            )}
                        </Card>
                );
            })}
        </>
    );
}

export default WorkoutCards;
