import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const session = await getServerSession(authOptions);

    try {
        const { userId, selectedEquipment } = JSON.parse(await request.text());

        if (!userId || !Array.isArray(selectedEquipment)) {
            return NextResponse.json({ error: "Invalid data format." }, { status: 400 });
        }

        await prisma.userEquipment.deleteMany({
            where: {
                userId: userId
            }
        });

        for (let item of selectedEquipment) {
            await prisma.userEquipment.create({
                data: {
                    userId: userId,
                    equipmentType: item
                }
            });
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("Error while saving the equipment:", error);
        return NextResponse.json({ error: "An error occurred saving equipment." }, { status: 500 });
    }
}
