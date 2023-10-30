import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

// PATCH
export async function PATCH( request ) {
    try {
        const session = await getServerSession(authOptions);
        const data = JSON.parse(await request.text());
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: data,
        });

        return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error while updating the user:", error.message);

        return NextResponse.json({ error: "An error occurred updating the user." }, { status: 500 });
    }
}


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

