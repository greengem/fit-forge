"use client";
import { ChangeEvent, FC, useState } from 'react';
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import {RadioGroup, Radio} from "@nextui-org/radio";
import {Button, ButtonGroup} from "@nextui-org/button";
import { IconArrowUp, IconArrowDown, IconTrash, IconStar, IconStarFilled } from '@tabler/icons-react';
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps?: number;
    exerciseDuration?: number;
    order?: number;
    trackingType: 'reps' | 'duration';
}

type ExerciseField = 'sets' | 'reps' | 'exerciseDuration' | 'trackingType';

type ExerciseTableProps = {
    selectedExercises: Exercise[];
    updateExercise: (index: number, field: ExerciseField, value: number | 'reps' | 'duration') => void;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    deleteExercise: (index: number) => void;
    favoriteExercises: FavoriteExercise[];
};
  
type FavoriteExercise = {
    exerciseId: string;
};

export default function ExerciseTable({ selectedExercises, updateExercise, moveUp, moveDown, deleteExercise, favoriteExercises }: ExerciseTableProps) {
    const router = useRouter();

    const [loadingFavorite, setLoadingFavorite] = useState<{ [key: string]: boolean }>({});
    const toggleFavoriteExercise = async (exerciseId: string) => {
        setLoadingFavorite({ ...loadingFavorite, [exerciseId]: true });
    
        try {
            let response;
    
            if (isFavorite(exerciseId)) {
                response = await fetch(`/api/users/favorites/${exerciseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await fetch('/api/users/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ exerciseId }),
                });
            }
    
            const data = await response.json();
    
            if (response.ok) {
                router.refresh();
            } else {
                toast.error(data.error || 'Error toggling favorite exercise');
            }
        } catch (error) {
            toast.error('An error occurred while communicating with the server.');
        } finally {
            setLoadingFavorite({ ...loadingFavorite, [exerciseId]: false });
        }
    };

    const isFavorite = (exerciseId: string) => {
        return favoriteExercises.some(favExercise => favExercise.exerciseId === exerciseId);
    };



    const updateTrackingType = (index: number, type: 'reps' | 'duration') => {
        updateExercise(index, 'trackingType', type);
    };

    return (
        <>
            {selectedExercises.map((exercise, index) => (
                <Card key={index} shadow='none' className='shadow-md'>
                    <CardBody className='p-3'>
                        <p className='mb-3'>{index + 1}. {exercise.name}</p>

                        <RadioGroup 
                            key={`radio-${exercise.id}`}
                            orientation="horizontal" 
                            color='primary' 
                            className='mb-3'
                            value={exercise.trackingType}
                            onValueChange={(value) => {
                                updateTrackingType(index, value as 'reps' | 'duration');
                            }}
                        >
                            <Radio value="reps">Reps</Radio>
                            <Radio value="duration">Duration (seconds)</Radio>
                        </RadioGroup>


                        <div className='grid grid-cols-2 gap-x-5 mb-3'>
                            <Input 
                                size="sm"
                                type="number"
                                label="Sets"
                                value={exercise.sets.toString()}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const intValue = parseInt(e.target.value, 10);
                                    if (!isNaN(intValue)) {
                                        updateExercise(index, 'sets', intValue);
                                    }
                                }}
                            />
                            {exercise.trackingType === 'reps' ? (
                        <Input 
                        size='sm'
                        label="Reps"
                        type="number" 
                        value={exercise.reps !== undefined && exercise.reps !== null ? exercise.reps.toString() : ''}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const intValue = parseInt(e.target.value, 10);
                            if (!isNaN(intValue)) {
                            updateExercise(index, 'reps', intValue);
                            }
                        }}
                        />
                            ) : (
                        <Input 
                            size='sm'
                            label="Duration"
                            type="number" 
                            value={
                            exercise.trackingType === 'duration' && exercise.exerciseDuration !== undefined && exercise.exerciseDuration !== null
                                ? exercise.exerciseDuration.toString()
                                : ''
                            }
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const intValue = parseInt(e.target.value, 10);
                            if (!isNaN(intValue)) {
                                updateExercise(index, 'exerciseDuration', intValue);
                            }
                            }}
                        />
                            )}
                        </div>

                        <ButtonGroup className='justify-start'>
                            <Button isIconOnly onPress={() => moveUp(index)}><IconArrowUp size={16} /></Button>
                            <Button isIconOnly onPress={() => moveDown(index)}><IconArrowDown size={16} /></Button>
                            <Button 
                                onPress={() => toggleFavoriteExercise(exercise.id)} 
                                isIconOnly
                                isLoading={loadingFavorite[exercise.id]}
                            >
                                {isFavorite(exercise.id) ? <IconStarFilled className="text-warning" size={20} /> : <IconStar size={20} />}
                            </Button>
                            <Button color='danger' isIconOnly onPress={() => deleteExercise(index)}><IconTrash size={16} /></Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}
