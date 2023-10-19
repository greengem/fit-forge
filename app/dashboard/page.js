import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";
import PageHeading from '@/components/PageHeading/PageHeading'
import CardGrid from "@/components/Grid/CardGrid";
import DeleteButton from "./DeleteButton";
import DashboardExerciseTable from "./DashboardExerciseTable";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

async function getWorkouts(userId) {
	const workouts = await prisma.workoutLog.findMany({
		where: {
			userId: userId,
		  },
		include: {
			WorkoutLogExercise: {
			include: {
				Exercise: true,
				SetLog: true,
			}
			},
			WorkoutPlan: true,
		}
	});
	return workouts;
}

function formatDuration(seconds) {
	const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const workouts = await getWorkouts(session.user.id)

	return (
		<>
			<PageHeading title="Dashboard" />
			<CardGrid>
				{workouts.map((workout) => {
					const totalWeightLifted = workout.WorkoutLogExercise.reduce((acc, wle) => {
						return acc + wle.SetLog.reduce((acc, set) => acc + set.weight, 0);
					}, 0);

					return (
						<Card key={workout.id}>
							<CardHeader className="flex gap-3">
								<Image
									alt="nextui logo"
									height={40}
									radius="sm"
									src="/icons/barbell.svg"
									width={40}
								/>
								<div className="flex flex-col">
									<p className="text-md">{workout.name}</p>
									<p className="text-small text-default-500">{formatDuration(workout.duration)} | {totalWeightLifted} KG</p>
								</div>
							</CardHeader>
							<CardBody>
								<DashboardExerciseTable workoutLogExercises={workout.WorkoutLogExercise} />
							</CardBody>
							<CardFooter>
								<DeleteButton id={workout.id} />
							</CardFooter>
						</Card>
					);
				})}
			</CardGrid>
		</>
	);
}
