import prisma from '/db/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { exerciseId } = params;
  
    try {
        const pb = await prisma.userExercisePB.findFirst({
            where: {
                exerciseId: exerciseId,
            }
        });

        if (!pb) {
            return NextResponse.json({ message: "No personal best found for the given exercise ID. You have an opportunity to set one!" }, { status: 200 });
        }

        return NextResponse.json(pb);
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "An error occurred fetching the personal best." }, { status: 500 });
    }
}
