import prisma from '/db/prisma';
import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "User is not authenticated." }, { status: 401 });
        }

        const requestBody = await request.text();

        const { exerciseId, weight, reps } = JSON.parse(requestBody);

        const existingPB = await prisma.userExercisePB.findUnique({
            where: {
                userId_exerciseId: {
                    userId: session.user.id,
                    exerciseId: exerciseId,
                }
            },
        });

        if (existingPB) {
            if (weight > existingPB.weight || reps > existingPB.reps) {
                await prisma.userExercisePB.update({
                    where: {
                        userId_exerciseId: {
                            userId: session.user.id,
                            exerciseId: exerciseId,
                        },
                    },
                    data: {
                        weight: Math.max(weight, existingPB.weight),
                        reps: Math.max(reps, existingPB.reps),
                    },
                });
            }
        } else {
            await prisma.userExercisePB.create({
                data: {
                    userId: session.user.id,
                    exerciseId: exerciseId,
                    weight: weight,
                    reps: reps,
                },
            });
        }

        return NextResponse.json({ message: "Personal best saved successfully." });
    } catch (error) {
        return NextResponse.json({ error: "An error occurred saving the personal best." }, { status: 500 });
    }
}
