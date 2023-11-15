import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache'

export async function POST(request) {
    const session = await getServerSession(authOptions);

    try {
        const session = await getServerSession(authOptions);
        const userId = session.user.id;
        const { selectedEquipment } = JSON.parse(await request.text());

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
        
        revalidateTag(`equipment_${userId}`);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred saving equipment." }, { status: 500 });
    }
}
