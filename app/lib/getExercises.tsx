import prisma from '@/db/prisma';
import { Exercise } from '@prisma/client';

export default async function getExercises(): Promise<Exercise[]> {
    const exercises = await prisma.exercise.findMany({
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
            description: true,
            date_created: true,
            date_updated: true,
        },
        orderBy: {
            name: 'asc',
        },
    });
    return exercises;
}
