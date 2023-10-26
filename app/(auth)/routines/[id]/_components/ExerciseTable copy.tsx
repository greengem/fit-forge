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
    reps: number;
    duration: number;
    order?: number;
}

type ExerciseTableProps = {
    selectedExercises: Exercise[];
    updateExercise: (index: number, field: 'sets' | 'reps' | 'duration', value: number) => void;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    deleteExercise: (index: number) => void;
};

const ExerciseTable: FC<ExerciseTableProps> = ({ selectedExercises, updateExercise, moveUp, moveDown, deleteExercise }) => {
    return (
        <Card>
            <CardHeader>
                <RadioGroup orientation="horizontal" color='success' defaultValue="sets">
                    <Radio value="sets">Sets</Radio>
                    <Radio value="duration">Duration</Radio>
                </RadioGroup>
            </CardHeader>
            <CardBody className='p-3'>
                <Table removeWrapper aria-label='Table of selected exercises' shadow="none">
                    <TableHeader>
                        <TableColumn>EXERCISE</TableColumn>
                        <TableColumn>SETS</TableColumn>
                        <TableColumn>REPS</TableColumn>
                        <TableColumn>DURATION</TableColumn>
                        <TableColumn className='hidden sm:table-cell'>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"Start searching to add exercises."}>
                        {selectedExercises.map((exercise, index) => (
                            <TableRow key={index}>
                                <TableCell>{exercise.name}</TableCell>
                                <TableCell>
                                    <Input 
                                        size='sm'
                                        type="number" 
                                        value={exercise.sets.toString()}
                                        className="max-w-[80px]"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            const intValue = parseInt(e.target.value, 10);
                                            if (!isNaN(intValue)) {
                                                updateExercise(index, 'sets', intValue);
                                            }
                                        }}
                                    />

                                </TableCell>
                                <TableCell>
                                    <Input 
                                        size='sm'
                                        type="number" 
                                        value={exercise.reps.toString()}
                                        className="max-w-[80px]"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            const intValue = parseInt(e.target.value, 10);
                                            if (!isNaN(intValue)) {
                                                updateExercise(index, 'reps', intValue);
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input 
                                        size='sm'
                                        type="number" 
                                        value={exercise.duration.toString()}
                                        className="max-w-[80px]"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            const intValue = parseInt(e.target.value, 10);
                                            if (!isNaN(intValue)) {
                                                updateExercise(index, 'duration', intValue);
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell className='hidden sm:table-cell'>
                                    <ButtonGroup className='mr-1'>
                                        <Button size='sm' isIconOnly onClick={() => moveUp(index)}><IconArrowUp size={16} /></Button>
                                        <Button size='sm' isIconOnly onClick={() => moveDown(index)}><IconArrowDown size={16} /></Button>
                                        <Button size='sm' color='danger' isIconOnly onClick={() => deleteExercise(index)}><IconTrash size={16} /></Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
        </Card>
    );
}

export default ExerciseTable;
