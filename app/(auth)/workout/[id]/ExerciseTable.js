"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IconSquare, IconSquareCheck } from '@tabler/icons-react';

export default function ExerciseTable({ exerciseDetail, index, exercises, weights, reps, handleCompletion, handleWeightChange, handleRepChange }) {
    return (
        <Table removeWrapper aria-label={`Table for exercise ${exerciseDetail.Exercise.name}`} className="min-w-full table-auto" shadow="none">
            <TableHeader>
                <TableColumn>SET</TableColumn>
                <TableColumn>KG</TableColumn>
                <TableColumn>REPS</TableColumn>
                <TableColumn className="flex justify-center items-center"><IconSquareCheck /></TableColumn>
            </TableHeader>
            <TableBody>
                {Array.from({ length: exercises[index].sets }).map((_, setIndex) => (
                    <TableRow key={setIndex}>
                        <TableCell>{setIndex + 1}</TableCell>
                        <TableCell>
                            <Input 
                                size="sm"
                                type='number' 
                                value={weights[index][setIndex]}
                                onChange={e => handleWeightChange(index, setIndex, Number(e.target.value))}
                                isDisabled={exercises[index].completedSets[setIndex]} 
                                className="max-w-[80px]"
                            />
                        </TableCell>
                        <TableCell>
                            <Input 
                                size="sm"
                                type="number" 
                                value={reps[index][setIndex]}
                                onChange={e => handleRepChange(index, setIndex, Number(e.target.value))}
                                isDisabled={exercises[index].completedSets[setIndex]}
                                className="max-w-[80px]"
                            />
                        </TableCell>
                        <TableCell className="text-center">
                            <Button size="sm" isIconOnly color={exercises[index].completedSets[setIndex] ? 'success' : 'danger'} onClick={() => handleCompletion(index, setIndex, exerciseDetail.Exercise.name)}>
                                {exercises[index].completedSets[setIndex] ? <IconSquareCheck size={20} /> : <IconSquare size={20} />}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
