import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from '@/db/prisma';
import PageHeading from '@/components/PageHeading/PageHeading'
import CardGrid from "@/components/Grid/CardGrid";
import DeleteButton from "./DeleteButton";
import DashboardExerciseTable from "./DashboardExerciseTable";
import Image from "next/image";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";

async function getWorkouts(userId) {

	if (!userId || typeof userId !== 'string') {
		return [];
	}

	const workouts = await prisma.workoutLog.findMany({
		where: {
			userId: userId,
		},
		select: {
			id: true,
			name: true,
			duration: true,
			createdAt: true,
			exercises: {
				select: {
					id: true,
					Exercise: {
						select: {
							name: true
						}
					},
					sets: {
						select: {
							weight: true,
							reps: true
						}
					}
				}
			}
		}
	});
	return workouts;
}


function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
}


export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const workouts = await getWorkouts(session.user.id)
	const totalWeightLifted = workouts.reduce((totalWeight, workout) => {
		return totalWeight + workout.exercises.reduce((exerciseWeight, exercise) => {
			return exerciseWeight + exercise.sets.reduce((setWeight, set) => setWeight + set.weight, 0);
		}, 0);
	}, 0);
	const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
	const averageDuration = workouts.length ? totalDuration / workouts.length : 0;
	const formattedAverageDuration = formatDuration(averageDuration);

	return (
		<>
			<PageHeading title="Dashboard" />
			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
				<Card><CardHeader className="px-5">Workouts Completed</CardHeader><CardBody className="text-5xl pt-0">{workouts.length}</CardBody></Card>
				<Card><CardHeader className="px-5">Total Weight Lifted (kg)</CardHeader><CardBody className="text-5xl pt-0">{totalWeightLifted}</CardBody></Card>
				<Card><CardHeader className="px-5">Average Workout Duration</CardHeader><CardBody className="text-5xl pt-0">{formattedAverageDuration}</CardBody></Card>
				<Card><CardHeader className="px-5">TODO</CardHeader><CardBody className="text-3xl pt-0">TODO</CardBody></Card>
			</div>

			<Card className="mb-10"><CardHeader>Workouts Over Time</CardHeader><CardBody className="text-3xl pt-0">CHART</CardBody></Card>

			<PageHeading title="History" />
			<CardGrid>
				{workouts.map((workout) => {
					const totalWeightLifted = workout.exercises.reduce((acc, exercise) => {
						return acc + exercise.sets.reduce((acc, set) => acc + set.weight, 0);
					}, 0);
					return (
						<Card key={workout.id}>
							<CardHeader className="flex gap-3 px-5">
								<Image
									alt="Barbell Icon"
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
							<CardBody className="py-0 pb-2">
								<DashboardExerciseTable workoutLogExercises={workout.exercises} workoutName={workout.name} workoutDate={workout.createdAt} />
							</CardBody>
							<CardFooter className="px-5">
								<DeleteButton id={workout.id} />
							</CardFooter>
						</Card>
					);
				})}
			</CardGrid>
		</>
	);
}
