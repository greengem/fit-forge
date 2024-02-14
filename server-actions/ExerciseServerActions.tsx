'use server'
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function handleToggleFavouriteExercise(exerciseId: string) {
    const { userId } : { userId: string | null } = auth();
    
    if (!userId) {
        throw new Error('You must be signed in to view this page.');
    }

    const favouriteExercise = await prisma.favouriteExercise.findUnique({
        where: {
            userId_exerciseId: {
                userId: userId,
                exerciseId: exerciseId,
            },
        },
    });
    
    if (favouriteExercise) {
        await prisma.favouriteExercise.delete({
            where: {
                userId_exerciseId: {
                    userId: userId,
                    exerciseId: exerciseId,
                },
            },
        });
    } else {
        await prisma.favouriteExercise.create({
            data: {
                exerciseId,
                userId: userId,
            },
        });
    }

    revalidatePath('/exercises');
}