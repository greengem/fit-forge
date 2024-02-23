"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function handleDeleteRoutine(routineId: string) {
    try {
        const { userId }: { userId: string | null } = auth();

        if (!userId) {
            throw new Error("You must be signed in to view this page.");
        }

        await prisma.workoutPlan.delete({
            where: {
                id: routineId,
            },
        });

        revalidatePath("/workout");

        return { success: true, message: "Routine deleted successfully" };
    } catch (e) {
        return { success: false, message: "Failed to delete routine" };
    }
  }
  