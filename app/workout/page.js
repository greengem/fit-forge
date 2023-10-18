import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";
import PageHeading from '@/components/PageHeading/PageHeading'
import Link from 'next/link';

async function getRoutines(userId){
  const routines = await prisma.workoutPlan.findMany({
    where: {
      userId: userId,
    },
    include: {
        WorkoutPlanExercise: {
            include: {
                Exercise: true
            }
        }
    }
});

  return routines;
}

export default async function RoutinesPage() {
  const authRequest = auth.handleRequest("GET", context);
  const session = await authRequest.validate();
  if (!session) redirect("/login");  
  const routines = await getRoutines(session.user.userId)

  return (
    <>
      <PageHeading title="Start a Workout" />
        {routines.map((routine) => (
          <div key={routine.id}>
          <p className='font-bold'>{routine.name}</p>
          {routine.notes && <p>{routine.notes}</p>}
          {routine.WorkoutPlanExercise.map((exerciseDetail) => (
            <ul key={exerciseDetail.Exercise.id} className='flex'>
              {exerciseDetail.Exercise.name && <li>{exerciseDetail.Exercise.name}</li>}
              {exerciseDetail.sets && <li>{exerciseDetail.sets} Sets</li>}
              {exerciseDetail.reps && <li>{exerciseDetail.reps} Reps</li>}
              {exerciseDetail.duration && <li>{exerciseDetail.duration} Duration</li>}
            </ul>
          ))}
          <Link className="text-blue-500" href={`/workout/${routine.id}`}>Start Workout</Link>
        </div>
        ))}
    </>
  )
}

