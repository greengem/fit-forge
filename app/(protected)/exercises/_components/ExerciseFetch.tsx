import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import ExerciseTable from "./ExerciseTable";
import { CategoryType, Muscle, LevelType, ForceType } from "@prisma/client";
import ExercisePagination from "./Filters/ExercisePagination";

interface UserRoutine {
    id: string;
    name: string;
    exerciseCount: number;
}

export default async function ExerciseFetch({ 
    search, 
    cat, 
    muscle, 
    level, 
    force, 
    currentPage, 
    userRoutines, 
    favs, 
    equipmentOwned
} : { 
    search: string, 
    cat: string[], 
    muscle: string[], 
    level: string[], 
    force: string[], 
    currentPage: number, 
    userRoutines: UserRoutine[], 
    favs: boolean, 
    equipmentOwned: boolean
}) {
    const { userId } : { userId: string | null } = auth();
  
    if (!userId) {
      throw new Error('You must be signed in to view this page.');
    }

    const userEquipment = await prisma.userEquipment.findMany({
        where: {
            userId: userId,
        },
        select: {
            equipmentType: true,
        }
    });

    const userEquipmentOwned = userEquipment.map(equipment => equipment.equipmentType);

    const itemsPerPage = 10;

    const exercises = await prisma.exercise.findMany({
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
        where: {
            name: {
                search: search
            },
            category: cat.length > 0 ? { in: cat as CategoryType[] } : undefined,
            level: level.length > 0 ? { in: level as LevelType[] } : undefined,
            force: force.length > 0 ? { in: force as ForceType[] } : undefined,
            equipment: equipmentOwned ? { in: userEquipmentOwned } : undefined,
            ...(muscle.length > 0 ? {
                OR: [
                    { primary_muscles: { hasEvery: muscle as Muscle[] } },
                    { secondary_muscles: { hasEvery: muscle as Muscle[] } }
                ]
            } : {}),
            ...(favs ? {
                favouritedBy: {
                    some: {
                        userId: userId
                    }
                }
            } : {})
        },
        orderBy: {
            name: 'asc',
        }
    });
    
    const numberOfResults = await prisma.exercise.count({
        where: {
            name: {
                search: search
            },
            category: cat.length > 0 ? { in: cat as CategoryType[] } : undefined,
            level: level.length > 0 ? { in: level as LevelType[] } : undefined,
            force: force.length > 0 ? { in: force as ForceType[] } : undefined,
            equipment: equipmentOwned ? { in: userEquipmentOwned } : undefined,
            ...(muscle.length > 0 ? {
                OR: [
                    { primary_muscles: { hasEvery: muscle as Muscle[] } },
                    { secondary_muscles: { hasEvery: muscle as Muscle[] } }
                ]
            } : {}),
            ...(favs ? {
                favouritedBy: {
                    some: {
                        userId: userId
                    }
                }
            } : {})
        },
    });

    const favouriteExercises = await prisma.favouriteExercise.findMany({
        where: {
            userId: userId,
        },
        select: {
            exerciseId: true,
        }
    });

    const favouriteExercisesSet = new Set(favouriteExercises.map(fav => fav.exerciseId));

    return (
        <>
            <ExerciseTable exercises={exercises} favouriteExercises={favouriteExercisesSet} userRoutines={userRoutines} />
            <ExercisePagination numberOfResults={numberOfResults} itemsPerPage={itemsPerPage} />
        </>
    );
}
