"use client";
import { ChangeEvent, FC } from 'react';
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import {RadioGroup, Radio} from "@nextui-org/radio";
import {Button, ButtonGroup} from "@nextui-org/button";
import { IconArrowUp, IconArrowDown, IconTrash, IconStar, IconStarFilled } from '@tabler/icons-react';
import useToggleFavoriteExericse from '@/app/hooks/useToggleFavoriteExercise';
import { useRouter } from "next/navigation";

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

const ExerciseTable: FC<ExerciseTableProps> = ({ selectedExercises, updateExercise, moveUp, moveDown, deleteExercise, favoriteExercises }) => {
    const router = useRouter();

    const toggleFavoriteExercise = useToggleFavoriteExericse(favoriteExercises);
    const handleToggleFavorite = async (exerciseId: string) => {
        await toggleFavoriteExercise(exerciseId);
        router.refresh();
    }
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
                            color='success' 
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
                            <Button onPress={() => handleToggleFavorite(exercise.id)} isIconOnly>
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

export default ExerciseTable;
