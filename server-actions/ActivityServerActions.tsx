"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";

export async function handleDeleteActivity(activityId: string) {
  try {
    const { userId }: { userId: string | null } = auth();

    if (!userId) {
      throw new Error("You must be signed in to view this page.");
    }

    await prisma.workoutLog.delete({
      where: {
        id: activityId,
      },
    });
    revalidatePath("/activity");
    return { success: true, message: "Activity deleted successfully" };
  } catch (e) {
    return { success: false, message: "Failed to delete activity" };
  }
}
