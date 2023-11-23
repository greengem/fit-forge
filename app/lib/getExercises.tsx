import prisma from '@/db/prisma';
import { unstable_cache } from 'next/cache';
import { Muscle, EquipmentType, CategoryType } from '@prisma/client';

type Exercise = {
    id: string;
    name: string;
    primary_muscles: Muscle[];
    secondary_muscles: Muscle[];
    equipment: EquipmentType | null;
    category: CategoryType;
    image: string | null;
};


const getCachedExercises = unstable_cache(
    async () => {
        //console.log("Fetching exercises from the database");
        return await prisma.exercise.findMany({
            select: {
                id: true,
                name: true,
                //aliases: true,
                primary_muscles: true,
                secondary_muscles: true,
                //force: true,
                //level: true,
                //mechanic: true,
                equipment: true,
                category: true,
                //instructions: true,
                //tips: true,
                image: true,
            },
            orderBy: {
                name: 'asc',
            }
        });
    },
    ['exerciseList'],
    {
        tags: ['exercises'],
        revalidate: 30000, // 30 seconds
    }
);

export default async function getExercises(): Promise<Exercise[]> {
    return await getCachedExercises();
}
