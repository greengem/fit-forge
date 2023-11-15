import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache'

// POST
export async function POST(request) {
    const session = await getServerSession(authOptions);

    try {
        const data = JSON.parse(await request.text());
        const { routineName, exercises, notes } = data;
        if (!routineName || !Array.isArray(exercises)) {
            return NextResponse.json({ error: "Invalid data format." }, { status: 400 });
        }
        
        const newWorkoutPlan = await prisma.workoutPlan.create({
            data: {
                name: routineName,
                userId: session.user.id,
                notes: notes,
                WorkoutPlanExercise: {
                    create: exercises.map((exercise) => ({
                        exerciseId: exercise.id,
                        sets: exercise.sets,
                        trackingType: exercise.trackingType,
                        reps: exercise.reps,
                        exerciseDuration: exercise.exerciseDuration,
                        order: exercise.order,
                    })),
                },
            },
        });

        revalidateTag(`routines_${session.user.id}`);
        return NextResponse.json({ success: true, id: newWorkoutPlan.id }, { status: 200 });

    } catch (error) {
        console.error("Error while saving the routine:", error);
        return NextResponse.json({ error: "An error occurred saving routine." }, { status: 500 });
    }
}
