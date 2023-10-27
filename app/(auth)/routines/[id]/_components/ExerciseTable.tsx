"use client";
import { ChangeEvent, FC } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import {RadioGroup, Radio} from "@nextui-org/radio";
import {Button, ButtonGroup} from "@nextui-org/button";
import { IconArrowUp, IconArrowDown, IconTrash } from '@tabler/icons-react';

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
};

const ExerciseTable: FC<ExerciseTableProps> = ({ selectedExercises, updateExercise, moveUp, moveDown, deleteExercise }) => {
    const updateTrackingType = (index: number, type: 'reps' | 'duration') => {
    updateExercise(index, 'trackingType', type);
    };

    return (
        <>
            {selectedExercises.map((exercise, index) => (
                <Card key={index} shadow='none'>
                    <CardBody className='p-3'>
                        <p className='mb-3'>{exercise.name}</p>

                        <RadioGroup 
                            key={`radio-${exercise.id}`}
                            orientation="horizontal" 
                            color='success' 
                            className='mb-3'
                            value={exercise.trackingType}
                            onValueChange={(value) => {
                                console.log(value);
                                updateTrackingType(index, value as 'reps' | 'duration');
                            }}
                        >
                            <Radio value="reps">Reps</Radio>
                            <Radio value="duration">Duration</Radio>
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
                            <Button isIconOnly onClick={() => moveUp(index)}><IconArrowUp size={16} /></Button>
                            <Button isIconOnly onClick={() => moveDown(index)}><IconArrowDown size={16} /></Button>
                            <Button color='danger' isIconOnly onClick={() => deleteExercise(index)}><IconTrash size={16} /></Button>
                        </ButtonGroup>
                    </CardBody>
                </Card>
            ))}
        </>
    );
}

export default ExerciseTable;
