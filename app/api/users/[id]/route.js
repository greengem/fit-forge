import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(request, { params }) {
    try {
        const userId = params.id;
        const data = JSON.parse(await request.text());
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: data,
        });

        return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
    } catch (error) {
        console.error("Error while updating the user:", error.message);

        return NextResponse.json({ error: "An error occurred updating the user." }, { status: 500 });
    }
}
