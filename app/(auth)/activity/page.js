import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions";
import getWorkouts from '@/app/lib/getWorkouts';
import getPbs from '@/app/lib/getPbs';
import PageHeading from '@/components/PageHeading/PageHeading'
import WorkoutCards from './_components/WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";
import Link from "next/link";

export default async function ActivityPage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.id;
	const workouts = await getWorkouts(userId)
	const personalBests = await getPbs(userId)

	return (
		<>
			<PageHeading title="Activity" />
			{workouts.length > 0 ? (
				<CardGrid>
					<WorkoutCards workouts={workouts} personalBests={personalBests} showDeleteButton={true} />
				</CardGrid>
			) : (
				<p>No workouts have been completed. <Link className="text-success" href="/workout">Click here to start one</Link>.</p>
			)}
		</>
	);
}
