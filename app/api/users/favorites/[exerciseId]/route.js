import prisma from '/db/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import { revalidateTag } from 'next/cache'

export async function DELETE(request, { params }) {
    try {
        const { exerciseId } = params;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userId = session.user.id;

        if (!exerciseId) {
            return NextResponse.json({ error: "Exercise ID is required" }, { status: 400 });
        }

        await prisma.favoriteExercise.delete({
            where: {
                userId_exerciseId: {
                    userId,
                    exerciseId,
                },
            }
        });

        revalidateTag(`favoriteExercises_${userId}`);
        return NextResponse.json({ message: "Favorite exercise removed." });
    } catch (error) {
        console.error("Error in DELETE /api/users/favorites:", error);
        return NextResponse.json({ error: "An error occurred removing favorite exercise." }, { status: 500 });
    }
}
