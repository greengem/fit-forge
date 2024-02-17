import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import ExerciseTable from "./ExerciseTable";
import { CategoryType, Muscle, LevelType, ForceType } from "@prisma/client";
import ExercisePagination from "./ExercisePagination";

export default async function ExerciseFetch({ 
    search, cat, muscle, level, force, currentPage
} : { 
    search: string, cat: string[], muscle: string[], level: string[], force: string[], currentPage: number
}) {
    const { userId } : { userId: string | null } = auth();
  
    if (!userId) {
      throw new Error('You must be signed in to view this page.');
    }

    const itemsPerPage = 10;
    
    const exercises = await prisma.exercise.findMany({
        take: itemsPerPage,
        skip: (currentPage - 1) * itemsPerPage,
        where: {
            name: {
                contains: search,
                mode: 'insensitive',
            },
            category: cat.length > 0 ? { in: cat as CategoryType[] } : undefined,
            level: level.length > 0 ? { in: level as LevelType[] } : undefined,
            force: force.length > 0 ? { in: force as ForceType[] } : undefined,
            ...(muscle.length > 0 ? {
                OR: [
                    { primary_muscles: { hasEvery: muscle as Muscle[] } },
                    { secondary_muscles: { hasEvery: muscle as Muscle[] } }
                ]
            } : {})
        },
        orderBy: {
            name: 'asc',
        }
    });

    const numberOfResults = await prisma.exercise.count({
        where: {
            name: {
                contains: search,
                mode: 'insensitive',
            },
            category: cat.length > 0 ? { in: cat as CategoryType[] } : undefined,
            level: level.length > 0 ? { in: level as LevelType[] } : undefined,
            force: force.length > 0 ? { in: force as ForceType[] } : undefined,
            ...(muscle.length > 0 ? {
                OR: [
                    { primary_muscles: { hasEvery: muscle as Muscle[] } },
                    { secondary_muscles: { hasEvery: muscle as Muscle[] } }
                ]
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
            <ExerciseTable exercises={exercises} favouriteExercises={favouriteExercisesSet} />
            <ExercisePagination numberOfResults={numberOfResults} itemsPerPage={itemsPerPage} />
        </>
    );
}
