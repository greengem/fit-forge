"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IconSquare, IconSquareCheck } from '@tabler/icons-react';

export default function ExerciseTable({ exerciseDetail, index, exercises, weights, reps, handleCompletion, handleWeightChange, handleRepChange }) {
    return (
        <Table removeWrapper aria-label={`Table for exercise ${exerciseDetail.Exercise.name}`} className="min-w-full table-auto mb-3">
            <TableHeader>
                <TableColumn>SET</TableColumn>
                <TableColumn>KG</TableColumn>
                <TableColumn>REPS</TableColumn>
                <TableColumn className="w-32"><IconSquareCheck /></TableColumn>
            </TableHeader>
            <TableBody>
                {Array.from({ length: exercises[index].sets }).map((_, setIndex) => (
                    <TableRow key={setIndex}>
                        <TableCell>{setIndex + 1}</TableCell>
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
                        <TableCell className="w-32">
                            <Button isIconOnly color={exercises[index].completedSets[setIndex] ? 'success' : 'default'} onClick={() => handleCompletion(index, setIndex, exerciseDetail.Exercise.name)}>
                                {exercises[index].completedSets[setIndex] ? <IconSquareCheck /> : <IconSquare />}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}