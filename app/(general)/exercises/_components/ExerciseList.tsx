"use client";
import { Exercise } from '@/types/ExerciseType';
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Pagination, User, Button, useDisclosure, ButtonGroup } from "@nextui-org/react";
import { IconInfoCircle, IconPlus, IconStar, IconStarFilled } from "@tabler/icons-react";
import { Muscle } from "@prisma/client";
import ExerciseSearch from "./ExerciseSearch";
import ExerciseFilters from "./ExerciseFilters";
import ExerciseModal from "./ExerciseModal";

interface ExerciseListProps {
  exercises: Exercise[];
  favoriteExercises: FavoriteExercise[];
};

type Filters = {
    category: string | null;
    muscleGroup: Muscle | null;
};

type FavoriteExercise = {
    exerciseId: string;
};

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, favoriteExercises }) => {
    const router = useRouter()

    // Modal
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    //Filters
    const [filters, setFilters] = useState<Filters>({ category: null, muscleGroup: null });
    const [searchQuery, setSearchQuery] = useState<string>("");

    const matchesCategory = (exercise: Exercise, category: string | null) => {
        return category === null || exercise.category === category;
    };
    
    const matchesMuscleGroup = (exercise: Exercise, muscleGroup: Muscle | null) => {
        if (muscleGroup === null || !exercise.primary_muscles || !exercise.secondary_muscles) return true;
        return exercise.primary_muscles.includes(muscleGroup) || exercise.secondary_muscles.includes(muscleGroup);
    };
      
    const matchesSearchQuery = (exercise: Exercise, query: string) => {
        return query === '' || exercise.name.toLowerCase().includes(query.toLowerCase());
    };

    const filteredExercises = useMemo(() => exercises.filter(exercise => 
        matchesCategory(exercise, filters.category) &&
        matchesMuscleGroup(exercise, filters.muscleGroup) &&
        matchesSearchQuery(exercise, searchQuery)
    ), [exercises, filters, searchQuery]);

    // Pagination
    const rowsPerPage = 10;
    const [page, setPage] = useState<number>(1);
    const displayedExercises = filteredExercises.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    const isFavorite = (exerciseId: string) => {
        return favoriteExercises.some(favExercise => favExercise.exerciseId === exerciseId);
    };

    const toggleFavoriteExercise = async (exerciseId: string) => {
        try {
            let response;
    
            if (isFavorite(exerciseId)) {
                response = await fetch(`/api/users/favorites/${exerciseId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } else {
                response = await fetch('/api/users/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ exerciseId }),
                });
            }
    
            const data = await response.json();
    
            if (response.ok) {
                toast.success(data.message);
                router.refresh(); // Refresh the data to reflect the changes
            } else {
                toast.error(data.error || 'Error toggling favorite exercise');
            }
        } catch (error) {
            toast.error('An error occurred while communicating with the server.');
        }
    };
    
    


    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-2 mb-3">
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
                                    <Button 
                                        onPress={() => toggleFavoriteExercise(exercise.id)}
                                        isIconOnly
                                    >
                                        {isFavorite(exercise.id) ? <IconStarFilled className="text-warning" size={20} /> : <IconStar size={20} />}
                                    </Button>
                                    
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
