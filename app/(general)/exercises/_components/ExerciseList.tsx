"use client";
import React, { useState, useMemo } from "react";
import ExerciseSearch from "./ExerciseSearch";
import ExerciseFilters from "./ExerciseFilters";
import ExerciseModal from "./ExerciseModal";
import { IconInfoCircle } from "@tabler/icons-react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Pagination, User, Button, useDisclosure } from "@nextui-org/react";
import { Exercise, Muscle } from '@prisma/client'; // Import Muscle from Prisma

interface ExerciseListProps {
  exercises: Exercise[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
    const rowsPerPage = 10;

    const [page, setPage] = useState<number>(1);
    const [filters, setFilters] = useState<{ category: string | null; muscleGroup: Muscle | null }>({ category: null, muscleGroup: null }); // Use Muscle type for muscleGroup
    const [searchQuery, setSearchQuery] = useState<string>("");

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const filteredExercises = useMemo(() => {
        return exercises.filter((exercise) => {
            const { category, primary_muscles, secondary_muscles, name } = exercise;

            if (filters.category && category !== filters.category) return false;
            if (
                filters.muscleGroup &&
                !primary_muscles.includes(filters.muscleGroup) &&
                !secondary_muscles.includes(filters.muscleGroup)
            ) return false;

            if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [exercises, filters, searchQuery]);

    const displayedExercises = filteredExercises.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-2 mb-3">
                <ExerciseSearch setSearchQuery={setSearchQuery} />
                <ExerciseFilters onFilterChange={setFilters} />
            </div>

            <Table aria-label="Exercise Table" className="mb-5 shadow-md" shadow="none">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn className="hidden lg:table-cell">MUSCLES</TableColumn>
                    <TableColumn><></></TableColumn>
                </TableHeader>
                <TableBody>
                    {displayedExercises.map((exercise) => (
                        <TableRow key={exercise.id}>
                            <TableCell className="capitalize">
                                <User
                                    avatarProps={{ radius: "lg", src: `/images/exercises/${exercise.image}/images/0.jpg` }}
                                    description={exercise.category}
                                    name={exercise.name}
                                />
                            </TableCell>
                            <TableCell className="capitalize hidden lg:table-cell">
                                <div className="flex flex-col">
                                    <p className="text-bold text-small">{exercise.primary_muscles.join(', ')}</p>
                                    <p className="text-bold text-tiny text-default-400">{exercise.secondary_muscles.join(', ')}</p>
                                </div>
                            </TableCell>
                            <TableCell className="flex justify-end">
                                <Button color="default" size="sm" isIconOnly onPress={() => { setSelectedExercise(exercise); onOpen(); }}>
                                    <IconInfoCircle />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex w-full justify-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="success"
                    page={page}
                    total={Math.ceil(filteredExercises.length / rowsPerPage)}
                    onChange={(newPage) => setPage(newPage)}
                />
            </div>

            {selectedExercise && (
                <ExerciseModal
                    selectedExercise={selectedExercise}
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            )}
        </>
    );
}

export default ExerciseList;
