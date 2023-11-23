"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Pagination, User, useDisclosure, ButtonGroup } from "@nextui-org/react";
import SearchFilter from "./ExerciseFilters/SearchFilter";
import CategoryFilters from "./ExerciseFilters/CategoryFilters";
import UserFilters from './ExerciseFilters/UserFilters';
import AddToFavorite from "./ActionButtons/AddToFavorite";
import ShowMoreInfo from "./ActionButtons/ShowMoreInfo";
import { EquipmentType, WorkoutPlan, Muscle, CategoryType } from "@prisma/client";

type Exercise = {
  id: string;
  name: string;
  primary_muscles: Muscle[];
  secondary_muscles: Muscle[];
  equipment: EquipmentType | null;
  category: CategoryType;
  image: string | null;
};

interface ExerciseListProps {
  exercises: Exercise[];
  favoriteExercises: FavoriteExercise[];
  myEquipment: EquipmentType[];
  myRoutines: WorkoutPlan[];
};

type Filters = {
    category: string | null;
    muscleGroup: Muscle | null;
};

type FavoriteExercise = {
    exerciseId: string;
};

const ExerciseList = ({ exercises, favoriteExercises, myEquipment, myRoutines }: ExerciseListProps) => {
    const router = useRouter();

    // Favorites
    const [loadingFavorite, setLoadingFavorite] = useState<{ [key: string]: boolean }>({});
    const toggleFavoriteExercise = async (exerciseId: string) => {
        setLoadingFavorite(prevState => ({ ...prevState, [exerciseId]: true }));
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
                router.refresh();
            } else {
                toast.error(data.error || 'Error toggling favorite exercise');
            }
        } catch (error) {
            toast.error('An error occurred while communicating with the server.');
        } finally {
            setLoadingFavorite(prevState => ({ ...prevState, [exerciseId]: false }));
        }
    };

    const isFavorite = (exerciseId: string) => {
        return favoriteExercises.some(favExercise => favExercise.exerciseId === exerciseId);
    };

    //Filters
    const [filters, setFilters] = useState<Filters>({ category: null, muscleGroup: null });
    const [filterByEquipment, setFilterByEquipment] = useState<boolean>(false);
    const [filterByFavorites, setFilterByFavorites] = useState<boolean>(false);
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

    const filteredExercises = useMemo(() => {
        const matchesEquipment = (exercise: Exercise) => {
            if (!filterByEquipment || !exercise.equipment) return true;
            return myEquipment.includes(exercise.equipment);
        };
    
        const matchesFavorites = (exercise: Exercise) => {
            if (!filterByFavorites) return true;
            return favoriteExercises.some(fav => fav.exerciseId === exercise.id);
        };
    
        return exercises.filter(exercise => 
            matchesCategory(exercise, filters.category) &&
            matchesMuscleGroup(exercise, filters.muscleGroup) &&
            matchesSearchQuery(exercise, searchQuery) &&
            matchesEquipment(exercise) &&
            matchesFavorites(exercise)
        );
    }, [exercises, filters, searchQuery, filterByEquipment, filterByFavorites, myEquipment, favoriteExercises]);

    // Pagination
    const rowsPerPage = 10;
    const [page, setPage] = useState<number>(1);
    const displayedExercises = filteredExercises.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );

    // Add to Routine
    const handleAddToRoutine = (exerciseId: string) => {
        // Your logic here
        console.log("Adding exercise with ID:", exerciseId);
      };
      

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 gap-y-2 mb-3">
                <SearchFilter setSearchQuery={setSearchQuery} />
                <CategoryFilters onFilterChange={setFilters} />
            </div>
            
            <UserFilters setFilterByEquipment={setFilterByEquipment} setFilterByFavorites={setFilterByFavorites} />
        
            <Table aria-label="Exercise Table" className="mb-5" shadow="none">
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn className="hidden lg:table-cell">MUSCLES</TableColumn>
                    <TableColumn><></></TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No results"}>
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

                                <ButtonGroup size="sm" variant='flat'>
                                    <AddToFavorite exercise={exercise} loadingFavorite={loadingFavorite} toggleFavoriteExercise={toggleFavoriteExercise} isFavorite={isFavorite} />
                                    <ShowMoreInfo exercise={exercise} />
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
        </>
    );
}

export default ExerciseList;
