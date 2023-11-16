import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import prisma from '@/db/prisma';
import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache'

// POST
export async function POST(request) {
    console.log("POST request received");
    const session = await getServerSession(authOptions);
    console.log("Session details:", session);

    try {
        const data = JSON.parse(await request.text());
        console.log("Parsed request data:", data);
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
        console.error("Error in POST handler:", error);
        return NextResponse.json({ error: "An error occurred saving routine." }, { status: 500 });
    }
}
