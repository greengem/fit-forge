'use server'
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function handleDeleteActivity(activityId: string) {
    try {
        await prisma.workoutLog.delete({
            where: {
                id: activityId,
            },
        });
        revalidatePath('/activity');
        return { success: true, message: 'Activity deleted successfully' };
    } catch (e) {
        return { success: false, message: 'Failed to delete activity' };
    }
}
