"use server";
import { createCanvas, registerFont } from "canvas";

registerFont("font/InterVariable.ttf", { family: "Inter" });

const data = [
  {
    id: "8394ff79-9df8-4123-8bc1-0a9899d0fa03",
    duration: 1927,
    createdAt: "2024-03-05T14:35:48.561Z",
    WorkoutPlan: {
      name: "Example Workout Plan",
    },
    exercises: [
      {
        id: "08d02227-13f8-4cb9-a33c-fa47b5f1101f",
        exerciseId: "7e55a2eb-4b92-4d00-af92-e24e575179af",
        trackingType: "duration",
        Exercise: {
          name: "Ab Crunch Machine",
        },
        sets: [
          {
            weight: 10,
            reps: null,
            exerciseDuration: 60,
          },
        ],
      },
      {
        id: "507631a9-fa27-43cf-8918-1f0364441a06",
        exerciseId: "c71643b5-8e7f-4fea-9c80-cbe1c84f3066",
        trackingType: "reps",
        Exercise: {
          name: "90/90 Hamstring",
        },
        sets: [
          {
            weight: 21,
            reps: 8,
            exerciseDuration: null,
          },
        ],
      },
      {
        id: "593183b3-a151-46a4-bc82-3a89243f31da",
        exerciseId: "98712f9f-93f6-492f-a98d-f21c5d056b59",
        trackingType: "reps",
        Exercise: {
          name: "Ab Roller",
        },
        sets: [
          {
            weight: 32,
            reps: 8,
            exerciseDuration: null,
          },
        ],
      },
      {
        id: "73f9cefb-d280-4ba5-8ed9-322383a39aed",
        exerciseId: "721365d1-b04e-490a-bd9f-1ace0eabac98",
        trackingType: "reps",
        Exercise: {
          name: "Adductor",
        },
        sets: [
          {
            weight: 21,
            reps: 8,
            exerciseDuration: null,
          },
        ],
      },
    ],
  },
];

export async function ShareImageServerAction() {
  const width = 640;
  const height = 240;
  const canvas = createCanvas(width, height);
  const context = canvas.getContext("2d");

  // Draw background
  context.fillStyle = "#18181b";
  context.fillRect(0, 0, width, height);

  // Use the first workout from the static data
  const workout = data[0];

  // Add workout title
  context.fillStyle = "#A6FF00";
  context.font = "30px Inter";
  context.fillText(workout.WorkoutPlan.name, 50, 50);

  // Change font size and style for exercise info
  context.fillStyle = "#ffffff";
  context.font = "16px Inter";

  // Add workout exercises
  workout.exercises.forEach((exercise, index) => {
    const setName = exercise.Exercise.name;
    const setDetails = exercise.sets
      .map((set) => {
        let details = `Weight: ${set.weight}`;
        if (set.reps !== null) {
          details += `, Reps: ${set.reps}`;
        }
        if (set.exerciseDuration !== null) {
          details += `, Duration: ${set.exerciseDuration}`;
        }
        return details;
      })
      .join(", ");
    context.fillText(`${setName}: ${setDetails}`, 50, 100 + index * 30);
  });

  // Convert the canvas to an image buffer
  const buffer = canvas.toBuffer("image/png");

  // Convert the buffer to a base64 string
  const base64 = buffer.toString("base64");

  // Return the base64 string
  return base64;
}
