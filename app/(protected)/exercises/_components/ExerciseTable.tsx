'use client'
import { handleToggleFavouriteExercise } from "@/server-actions/ExerciseServerActions";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconInfoCircle, IconPlus, IconStar, IconStarFilled } from "@tabler/icons-react";
import Link from "next/link";

type Exercise = {
    id: string;
    name: string;
    category: string;
    image: string | null;
    primary_muscles: string[];
    secondary_muscles: string[];
    equipment: string | null;
};
  
type ExerciseProps = {
    exercises: Exercise[];
    favouriteExercises: Set<string>;
};

export default function ExerciseTable({ exercises, favouriteExercises }: ExerciseProps) {
  return (
    <Table aria-label="Exercises Table" className="mb-3 shadow-md" shadow="none">
        <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn className="hidden lg:table-cell">MUSCLES</TableColumn>
            <TableColumn className="hidden lg:table-cell">CATEGORY</TableColumn>
            <TableColumn><></></TableColumn>
        </TableHeader>
        <TableBody>
            {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                    <TableCell className="capitalize py-1">
                        <User
                            avatarProps={{ radius: "lg", src: `/images/exercises/${exercise.image}/images/0.jpg` }}
                            description={exercise.category}
                            name={exercise.name}
                        />
                    </TableCell>
                    <TableCell className="capitalize hidden lg:table-cell py-1">
                        <div className="flex flex-col">
                            <p className="text-bold text-small">{exercise.primary_muscles.join(', ')}</p>
                            <p className="text-bold text-tiny text-default-400">{exercise.secondary_muscles.join(', ')}</p>
                        </div>
                    </TableCell>
                    <TableCell className="capitalize hidden lg:table-cell py-1">{exercise.category}</TableCell>
                    <TableCell className="flex justify-end py-1">
                        <ButtonGroup size="sm" variant='flat'>
                            <Button isIconOnly as={Link} href={`/exercises/${exercise.id}`}>
                                <IconInfoCircle size={20} />
                            </Button>
                            <Button isIconOnly onClick={() => handleToggleFavouriteExercise(exercise.id)}>
                                {favouriteExercises.has(exercise.id) ? <IconStarFilled className="text-primary" size={20} /> : <IconStar className="hover:text-primary" size={20} />}
                            </Button>
                            <Button isIconOnly><IconPlus size={20} /></Button>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );
}