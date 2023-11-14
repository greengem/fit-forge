"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Input, Button } from "@nextui-org/react";
import { IconSquare, IconSquareCheck } from '@tabler/icons-react';

export default function ExerciseTable({ 
    exerciseDetail, 
    index, 
    handleCompleteSet, 
    handleWeightChange, 
    handleRepChange, 
    handleDurationChange 
}) {
    return (
        <Table removeWrapper aria-label={`Table for exercise ${exerciseDetail.exerciseName}`} className="min-w-full table-auto" shadow="none">
            <TableHeader>
                <TableColumn>SET</TableColumn>
                <TableColumn>KG</TableColumn>
                {
                    exerciseDetail.trackingType === 'duration' ? (
                        <TableColumn>DURATION</TableColumn>
                    ) : (
                        <TableColumn>REPS</TableColumn>
                    )
                }
                <TableColumn className="flex justify-center items-center"><IconSquareCheck /></TableColumn>
            </TableHeader>
            <TableBody>
                {exerciseDetail.sets.map((set, setIndex) => (
                    <TableRow key={setIndex}>
                        <TableCell>{setIndex + 1}</TableCell>
                        <TableCell>
                            <Input 
                                labelPlacement="outside"
                                type='number' 
                                value={set.weight || ""}
                                onChange={e => handleWeightChange(index, setIndex, Number(e.target.value))}
                                isDisabled={set.completed} 
                                className="max-w-[80px]"
                            />
                        </TableCell>
                        {
                        exerciseDetail.trackingType === 'duration' ? (
                            <TableCell>
                                <Input 
                                    labelPlacement="outside"
                                    type="number" 
                                    value={set.duration || ""}
                                    onChange={e => handleDurationChange(index, setIndex, Number(e.target.value))}
                                    isDisabled={set.completed}
                                    className="max-w-[80px]"
                                />
                            </TableCell>
                        ) : (
                            <TableCell>
                                <Input 
                                    labelPlacement="outside"
                                    type="number" 
                                    value={set.reps || ""}
                                    onChange={e => handleRepChange(index, setIndex, Number(e.target.value))}
                                    isDisabled={set.completed}
                                    className="max-w-[80px]"
                                />
                            </TableCell>
                        )}

                        <TableCell className="text-center">
                            <Button 

                                isIconOnly 
                                color={set.completed ? 'success' : 'danger'} 
                                onClick={() => handleCompleteSet(index, setIndex, exerciseDetail.exerciseName)}
                            >
                                {set.completed ? <IconSquareCheck size={20} /> : <IconSquare size={20} />}
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
