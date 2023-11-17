import prisma from '/db/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { revalidateTag } from 'next/cache'

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;

        // Parse the request body to get the exerciseId
        const body = await request.json();
        const { exerciseId } = body;

        // Validate exerciseId
        if (!exerciseId) {
            return NextResponse.json({ error: "Exercise ID is required" }, { status: 400 });
        }

        // Create a new favorite exercise record
        const favorite = await prisma.favoriteExercise.create({
            data: {
                userId,
                exerciseId,
            }
        });

        revalidateTag(`favoriteExercises_${session.user.id}`);

        return NextResponse.json({ message: "Favorite exercise saved." });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred saving favorite exercise." }, { status: 500 });
    }
}
