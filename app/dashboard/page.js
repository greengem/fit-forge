import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import prisma from '@/db/prisma';
import { redirect } from "next/navigation";

import PageHeading from '@/components/PageHeading/PageHeading'
import DeleteButton from "./DeleteButton";
import Form from "@/components/form";

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
		  <p>User id: {session.user.userId}</p>
		  <p>Username: {session.user.username}</p>
		  <Form action="/api/logout">
			<input type="submit" value="Sign out" />
		  </Form>
		  <div className="bg-gray-300 p-5 my-10">
			<h4 className="text-xl font-semibold">RAW DATA</h4>
			<hr />
			{workouts.map((workout) => (
			  <div key={workout.id}>
				<strong>Workout Name:</strong> {workout.name}
				<strong>Date and Time:</strong> {new Date(workout.date).toLocaleString()}
				<strong>Duration:</strong> {formatDuration(workout.duration)}
				<ul>
				  {workout.WorkoutLogExercise.map(wle => (
					<li key={wle.id}>
					  <strong>Exercise:</strong> {wle.Exercise.name}
					  <ul>
						{wle.SetLog.map(set => (
						  <li key={set.id}>
							<strong>Weight:</strong> {set.weight} 
							<strong>, Reps:</strong> {set.reps}
						  </li>
						))}
					  </ul>
					</li>
				  ))}
				</ul>
				<DeleteButton id={workout.id} />
				<hr className="my-5" />
			  </div>
			))}
			</div>

			<div className="bg-gray-300 p-5 my-10">
				<h4 className="text-xl font-semibold">BEST SET STYLE</h4>
				<hr />
				{workouts.map((workout) => {
					const totalWeightLifted = workout.WorkoutLogExercise.reduce((acc, wle) => {
						return acc + wle.SetLog.reduce((acc, set) => acc + set.weight, 0);
					}, 0);

					return (
						<div key={workout.id}>
							<h5>{workout.name}</h5>
							<p>{formatDuration(workout.duration)} | {totalWeightLifted} KG</p>
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
							<DeleteButton id={workout.id} />
							<hr className="my-5" />
						</div>
					);
				})}
			</div>
		</>
	);
}
