"use server";
import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import { EquipmentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function handleUpdateUserInfo(data: {
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

    return { success: true, message: "User equipment updated" };
  } catch (e) {
    return { success: false, message: "Failed to update user equipment" };
  }
}
