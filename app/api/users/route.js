import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

// DELETE
export async function DELETE() {
    try {
        const session = await getServerSession(authOptions);

        await prisma.user.delete({
            where: { id: session.user.id },
        });

        return NextResponse.json({ success: true, message: 'User deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error("Error while deleting the user:", error.message);
        console.error(error);

        return NextResponse.json({ error: "An error occurred while deleting the user." }, { status: 500 });
    }
}
