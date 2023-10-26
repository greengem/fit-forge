"use client";
import React from 'react';
import { format } from 'date-fns';
import ActionDropdown from "@/components/Cards/ActionDropdown";
import {Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Chip } from "@nextui-org/chip";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

function RoutineCard({ routine, isSystem, isExpanded, onToggleExpanded, onAction, isRoutine = true }) {
    const uniqueCategories = new Set();
    routine.WorkoutPlanExercise.forEach((exerciseDetail) => {
        uniqueCategories.add(exerciseDetail.Exercise.category);
    });

    const displayedExercises = isExpanded ? routine.WorkoutPlanExercise : routine.WorkoutPlanExercise.slice(0, 3);

    const categoryColorMap = {
        'strength': 'success',
        'cardio': 'secondary',
        'stretching': 'warning',
        'plyometrics': 'primary',
        'strongman': 'danger',
        'powerlifting': 'default',
        'olympic_weightlifting': 'secondary'
    };

    return (
        <Card key={routine.id} shadow="none">
            <CardHeader className="flex gap-3 px-5">
                <div className="flex flex-col flex-grow">
                    <p className='text-md font-semibold'>{routine.name}</p>
                    {!isSystem && (
                        <p className="text-small text-default-500">Updated: {format(new Date(routine.updatedAt), 'MM/dd/yyyy')}</p>
                    )}
                </div>
                {isRoutine && !isSystem && <ActionDropdown onAction={onAction} routine={routine} />}
            </CardHeader>

            <CardBody className="pt-0">
                <ul className="space-y-1 text-sm">
                    {displayedExercises.sort((a, b) => a.order - b.order).map((exerciseDetail) => (
                        <li key={exerciseDetail.Exercise.id}>
                            {exerciseDetail.sets && exerciseDetail.sets} x {exerciseDetail.Exercise.name}
                        </li>
                    ))}
                </ul>

                {routine.WorkoutPlanExercise.length > 5 && (
                    <button 
                        className='text-left text-success'
                        onClick={() => onToggleExpanded(routine.id)}
                    >
                        {isExpanded ? 'Show Less' : 'Show More'}
                    </button>
                )}
            </CardBody>
            <CardFooter className="gap-x-1 pt-0 px-5">
                {isRoutine ? (
                    Array.from(uniqueCategories).map((category, index) => (
                        <Chip 
                            radius="sm" 
                            size="sm" 
                            className="capitalize" 
                            color={categoryColorMap[category] || 'default'} 
                            key={index}
                        >
                            {category}
                        </Chip>
                    ))
                ) : (
                    <Button variant="ghost" as={Link} href={`/workout/${routine.id}`} size="sm" color="success" className="gap-unit-1">
                        <IconPlayerPlayFilled size={16} />
                        Start Workout
                    </Button>
                )}
            </CardFooter>

        </Card>
    );
}

export default RoutineCard;
