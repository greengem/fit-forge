'use client'
import { handleToggleFavouriteExercise } from "@/server-actions/ExerciseServerActions";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconPlus, IconStar, IconStarFilled } from "@tabler/icons-react";
import ExerciseInfoButton from "./ExerciseInfoButton";
import { Exercise } from "@prisma/client";
import ExerciseAddToRoutineButton from "./ExerciseAddToRoutineButton";

interface UserRoutine {
    id: string;
    name: string;
    exerciseCount: number;
}

type ExerciseProps = {
    exercises: Exercise[];
    favouriteExercises: Set<string>;
    userRoutines: UserRoutine[];
}

export default function ExerciseTable({ exercises, favouriteExercises, userRoutines }: ExerciseProps) {
  return (
    <Table aria-label="Exercises Table" className="mb-3 shadow-md" shadow="none">
        <TableHeader>
            <TableColumn>NAME</TableColumn>
            <TableColumn className="hidden lg:table-cell">MUSCLES</TableColumn>
            <TableColumn><></></TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No results found."}>
            {exercises.map((exercise) => (
                <TableRow key={exercise.id}>
                    <TableCell className="capitalize py-1">
                        <User
                            avatarProps={{ radius: "lg", src: `/images/exercises/${exercise.image}/images/0.jpg` }}
                            description={(<span className="text-zinc-500">{exercise.category}</span>)}
                            name={exercise.name}
                        />
                    </TableCell>
                    <TableCell className="capitalize hidden lg:table-cell py-1">
                        <div className="flex flex-col">
                            <p className="text-bold text-small">{exercise.primary_muscles.join(', ')}</p>
                            <p className="text-bold text-tiny text-zinc-500">{exercise.secondary_muscles.join(', ')}</p>
                        </div>
                    </TableCell>
                    <TableCell className="flex justify-end py-1">
                        <ButtonGroup size="sm" variant='flat'>
                            <ExerciseInfoButton exercise={exercise} />
                            <Button isIconOnly onClick={() => handleToggleFavouriteExercise(exercise.id)}>
                                {favouriteExercises.has(exercise.id) ? <IconStarFilled className="text-primary" size={20} /> : <IconStar className="hover:text-primary" size={20} />}
                            </Button>
                            <ExerciseAddToRoutineButton exercise={exercise} userRoutines={userRoutines} />
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
  );
}