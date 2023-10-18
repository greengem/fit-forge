import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';

// POST
export async function POST(request) {
    const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();
    try {
        // Parse the incoming data from the request body
        const data = JSON.parse(await request.text());
        const { routineName, exercises, notes } = data;

        // Validate the received data
        if (!routineName || !Array.isArray(exercises)) {
            return new Response(JSON.stringify({ error: "Invalid data format." }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Save the workout plan to the database
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

        // Return the ID of the newly created workout plan
        return new Response(JSON.stringify({ success: true, id: newWorkoutPlan.id }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
            console.error("Error while saving the routine:", error);
            return new Response(JSON.stringify({ error: "An error occurred saving routine." }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        
}
