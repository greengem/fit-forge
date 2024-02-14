'use server'
import prisma from "@/prisma/prisma";

export async function handleDeleteActivity(activityId: string) {
    await prisma.workoutLog.delete({
        where: {
            id: activityId,
        },
    });
}
