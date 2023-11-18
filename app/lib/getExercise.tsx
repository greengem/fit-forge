import prisma from '@/db/prisma';
//import { Exercise } from '@/types/ExerciseType';

export default async function getExercise(exerciseId: string) {
    try {
        const exercise = await prisma.exercise.findUnique({
            where: { id: exerciseId },
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
            }
        });
        return exercise;
    } catch (error) {
        throw error;
    }
}
