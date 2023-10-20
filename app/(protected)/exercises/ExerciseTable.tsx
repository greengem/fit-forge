"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import {User} from "@nextui-org/user";
import { IconInfoCircle } from '@tabler/icons-react';

interface ExerciseProps {
    exercises: any[];
}

const ExerciseTable: React.FC<ExerciseProps> = ({ exercises }) => (
    <Table aria-label="Table of Exercises">
        <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn>Muscles</TableColumn>
            <TableColumn>Level</TableColumn>
            <TableColumn>More Info</TableColumn>
        </TableHeader>
        <TableBody>
        {exercises.map((exercise) => (
            <TableRow key={exercise.id}>
                <TableCell>
                <User
                    name={exercise.name}
                    description={exercise.category}
                    avatarProps={{
                        src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                    }}
                />
                </TableCell>
                <TableCell>
                <div>
                    <p>{exercise.primary_muscles.join(', ')}</p>
                    <p>{exercise.secondary_muscles.join(', ')}</p>
                </div>
                </TableCell>
                <TableCell>{exercise.level}</TableCell>
                <TableCell><Button isIconOnly><IconInfoCircle /></Button></TableCell>
            </TableRow>
        ))}
        </TableBody>
    </Table>
);

export default ExerciseTable;