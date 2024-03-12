"use server";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/prisma/prisma";
import { EquipmentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function handleUpdateUserDetails(data: {
  username: string;
  firstName: string;
  lastName: string;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  try {
    await clerkClient.users.updateUser(userId, {
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
    });

    revalidatePath("/profile");
    return { success: true, message: "User info updated" };
  } catch (e) {
    return { success: false, message: "Failed to update user info" };
  }
}

export async function handleUpdateUserMeasurements(data: {
  age: string;
  height: string;
  weight: string;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const parsedData = {
    age: data.age ? parseInt(data.age, 10) : null,
    height: data.height ? parseFloat(data.height) : null,
    weight: data.weight ? parseFloat(data.weight) : null,
  };

  try {
    await prisma.userInfo.upsert({
      where: { userId: userId },
      update: parsedData,
      create: {
        ...parsedData,
        userId: userId,
      },
    });

    revalidatePath("/profile");
    return { success: true, message: "User info updated" };
  } catch (e) {
    return { success: false, message: "Failed to update user info" };
  }
}

export async function handleUpdateUserEquipment(
  selectedEquipment: EquipmentType[],
) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  try {
    await prisma.userEquipment.deleteMany({
      where: {
        userId: userId,
      },
    });

    for (let item of selectedEquipment) {
      await prisma.userEquipment.create({
        data: {
          userId: userId,
          equipmentType: item,
        },
      });
    }

    revalidatePath("/profile");
    return { success: true, message: "User equipment updated" };
  } catch (e) {
    return { success: false, message: "Failed to update user equipment" };
  }
}

export async function handleCreateUserGoal(data: {
  exerciseId: string;
  goalValue: number;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  try {
    await prisma.userGoal.create({
      data: {
        userId: userId,
        exerciseId: data.exerciseId,
        goalType: "WEIGHT",
        goalValue: data.goalValue,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, message: "New goal created" };
  } catch (e) {
    return { success: false, message: "Failed to add goal" };
  }
}

export async function handleDeleteUserGoal(id: string) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  try {
    await prisma.userGoal.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Goal deleted" };
  } catch (e) {
    return { success: false, message: "Failed to delete goal" };
  }
}
