import { NextResponse } from 'next/server'
import prisma from '@/db/prisma';

// DELETE
export async function DELETE(req, context) {
  const params = context.params;

  try {
    await prisma.workoutLog.delete({
      where: {
        id: params.id,
      },
    });
    return NextResponse.json({ message: "Exercise deleted successfully." });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting the Exercise." });
  }
}
