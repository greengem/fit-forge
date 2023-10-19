import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";

import PageHeading from '@/components/PageHeading/PageHeading'
import CardGrid from "@/components/Grid/CardGrid";
import DeleteButton from "./DeleteButton";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { User } from "@nextui-org/user";

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
			User: true,
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
	const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();

	if (!session) redirect("/login");
	const workouts = await getWorkouts(session.user.userId)

	return (
		<>
			<PageHeading title="Dashboard" />
			<User   
				name={session.user.githubUsername}
				description="todo"
				avatarProps
			/>

			<CardGrid>
				{workouts.map((workout) => {
					const totalWeightLifted = workout.WorkoutLogExercise.reduce((acc, wle) => {
						return acc + wle.SetLog.reduce((acc, set) => acc + set.weight, 0);
					}, 0);

					return (
						<Card key={workout.id}>
							<CardHeader>
							<h5>{workout.name}</h5>
							<p>{formatDuration(workout.duration)} | {totalWeightLifted} KG</p>
							</CardHeader>
							<CardBody>
							<table className="min-w-full divide-y divide-gray-200 mt-4">
								<thead>
									<tr>
										<th className="py-2 px-4">EXERCISE</th>
										<th className="py-2 px-4">BEST SET</th>
									</tr>
								</thead>
								<tbody>
									{workout.WorkoutLogExercise.map(wle => {
										// Determine the best set for this exercise
										const bestSet = wle.SetLog.reduce((best, set) => {
											return set.weight > best.weight ? set : best;
										}, { weight: 0, reps: 0 });

										return (
											<tr key={wle.id}>
												<td className="py-2 px-4">{wle.Exercise.name}</td>
												<td className="py-2 px-4">{bestSet.reps} X {bestSet.weight} KG</td>
											</tr>
										);
									})}
								</tbody>
							</table>
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
