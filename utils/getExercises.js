'use server';
import { unstable_cache } from 'next/cache';
import prisma from '@/db/prisma';

async function fetchExercisesFromDB() {
    console.log("Fetching exercises from database...");
    return await prisma.exercise.findMany({
        take: 100,
        select: {
            id: true,
            name: true,
            aliases: true,
            primary_muscles: true,
            secondary_muscles: true,
            force: true,
            level: true,
            mechanic: true,
            equipment: true,
            category: true,
            instructions: true,
            tips: true,
            image: true,
        },
    });
}

export default async function getExercises() {
    const getCachedOrFetchExercises = unstable_cache(
        fetchExercisesFromDB,
        'exerciseList',
        { tags: ['exercises'], revalidate: 6000 }
    );

    return await getCachedOrFetchExercises();
}
