"use client";
import { useState, useMemo } from "react";
import ExerciseSearch from "./ExerciseSearch";
import ExerciseFilters from "./ExerciseFilters";
import ExerciseModal from "./ExerciseModal";
import { IconInfoCircle, IconPlus, IconStar } from "@tabler/icons-react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Pagination, User, Button, useDisclosure, ButtonGroup } from "@nextui-org/react";
import { Exercise } from '@/types/ExerciseType';
import { Muscle } from "@prisma/client";
import toast from "react-hot-toast";

type FavoriteExercise = {
    exerciseId: string;
};
interface ExerciseListProps {
  exercises: Exercise[];
  favoriteExercises: FavoriteExercise[];
}

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, favoriteExercises }) => {
    // Pagination
    const rowsPerPage = 10;
    const [page, setPage] = useState<number>(1);

    // Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    //Filters
    const [filters, setFilters] = useState<{ category: string | null; muscleGroup: Muscle | null }>({ category: null, muscleGroup: null });
    const [searchQuery, setSearchQuery] = useState<string>("");

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

    const toggleFavoriteExercise = async (exerciseId: string) => {
        try {
            const response = await fetch('/api/users/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ exerciseId }),
            });
            const data = await response.json();

            if (response.ok) {
                toast.success(data.message);
            } else {
                toast.error(data.error || 'Error toggling favorite exercise');
            }
        } catch (error) {
            toast.error('An error occurred while communicating with the server.');
        }
    };

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
                                <ButtonGroup size="sm">
                                    <Button isIconOnly><IconPlus size={20} /></Button>
                                    <Button onPress={() => toggleFavoriteExercise(exercise.id)} isIconOnly><IconStar size={20} /></Button>
                                    
                                    <Button isIconOnly onPress={() => { setSelectedExercise(exercise); onOpen(); }}>
                                        <IconInfoCircle size={20} />
                                    </Button>
                                </ButtonGroup>
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
