import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from '@/db/prisma';
import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

// DELETE
export async function DELETE(req, context) {
  const session = await getServerSession(authOptions);
  const params = context.params;

  try {
    await prisma.workoutLog.delete({
      where: {
        id: params.id,
      },
    });

    revalidateTag(`recentWorkouts_${session.user.id}`);
    revalidateTag(`workouts_${session.user.id}`);
    
    return NextResponse.json({ message: "Exercise deleted successfully." });

  } catch (error) {

    return NextResponse.json({ error: "Error deleting the Exercise." });

  }
}
