import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';

// POST
export async function POST(request) {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();

    try {
        const data = JSON.parse(await request.text());
        const { routineName, exercises, notes } = data;

        if (!routineName || !Array.isArray(exercises)) {
            return NextResponse.json({ error: "Invalid data format." }, { status: 400 });
        }

        const newWorkoutPlan = await prisma.workoutPlan.create({
            data: {
                name: routineName,
                userId: session.user.userId,
                notes: notes,
                WorkoutPlanExercise: {
                    create: exercises.map((exercise) => ({
                        exerciseId: exercise.id,
                        sets: exercise.sets,
                        reps: exercise.reps,
                        duration: exercise.duration,
                        order: exercise.order,
                    })),
                },
            },
        });

        return NextResponse.json({ success: true, id: newWorkoutPlan.id }, { status: 200 });

    } catch (error) {
        console.error("Error while saving the routine:", error);
        return NextResponse.json({ error: "An error occurred saving routine." }, { status: 500 });
    }
}
