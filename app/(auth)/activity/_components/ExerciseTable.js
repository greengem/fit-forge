"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Exercise } from '@/types/workout';
import { IconTrophy } from "@tabler/icons-react";

const ExerciseTable = ({ workoutLogExercises, workoutName, workoutDate, personalBests }) => {
    const formattedDate = `${workoutDate.getDate()}/${workoutDate.getMonth() + 1}/${workoutDate.getFullYear()}`;

    return (
        <Table shadow="none" removeWrapper aria-label={`Exercise sets for ${workoutName} on ${formattedDate}`}>
            <TableHeader>
                <TableColumn>EXERCISE</TableColumn>
                <TableColumn>BEST SET</TableColumn>
                <TableColumn>PB</TableColumn>
            </TableHeader>
            <TableBody>
                {workoutLogExercises.map((exercise) => (
                    exercise.sets.map((set, index) => (
                        <TableRow key={`${exercise.id}-${index}`}>
                            <TableCell className="truncate whitespace-nowrap max-w-[164px] py-0 px-0">{exercise.Exercise.name}</TableCell>
                            {
                                set.weight === 0 && set.exerciseDuration !== null ? (
                                    <TableCell className="py-0">{`${set.exerciseDuration}`} secs</TableCell>
                                ) : set.weight === 0 && set.exerciseDuration === null ? (
                                    <TableCell className="py-0">{`${set.reps}`} reps</TableCell>
                                ) : set.exerciseDuration !== null ? (
                                    <TableCell className="py-0">{`${set.weight}kg x ${set.exerciseDuration}`} secs</TableCell>
                                ) : (
                                    <TableCell className="py-0">{`${set.weight}kg x ${set.reps}`} reps</TableCell>
                                )
                            }
                            <TableCell className="text-success py-0 px-0">{personalBests[exercise.id]}</TableCell>
                        </TableRow>
                    ))
                ))}
            </TableBody>
        </Table>
    );
};

export default ExerciseTable;
