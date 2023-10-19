"use client";
import { ChangeEvent, FC } from 'react';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconArrowUp, IconArrowDown, IconTrash } from '@tabler/icons-react';
interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    order?: number;
}

type ExerciseTableProps = {
    selectedExercises: Exercise[];
    updateExercise: (index: number, field: 'sets' | 'reps', value: number) => void;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    deleteExercise: (index: number) => void;
};

const ExerciseTable: FC<ExerciseTableProps> = ({ selectedExercises, updateExercise, moveUp, moveDown, deleteExercise }) => {
    return (
        <Table>
            <TableHeader>
                <TableColumn>EXERCISE</TableColumn>
                <TableColumn>SETS</TableColumn>
                <TableColumn>REPS</TableColumn>
                <TableColumn>ACTIONS</TableColumn>
            </TableHeader>
            <TableBody>
                {selectedExercises.map((exercise, index) => (
                    <TableRow key={index}>
                        <TableCell>{exercise.name}</TableCell>
                        <TableCell>
                            <Input 
                                type="number" 
                                value={exercise.sets} 
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
                                type="number" 
                                value={exercise.reps} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const intValue = parseInt(e.target.value, 10);
                                    if (!isNaN(intValue)) {
                                        updateExercise(index, 'reps', intValue);
                                    }
                                }}

                            />
                        </TableCell>
                        <TableCell className='flex gap-2'>
                            <Button isIconOnly onClick={() => moveUp(index)}><IconArrowUp /></Button>
                            <Button isIconOnly onClick={() => moveDown(index)}><IconArrowDown /></Button>
                            <Button color='danger' isIconOnly onClick={() => deleteExercise(index)}><IconTrash /></Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default ExerciseTable;
