import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getWorkouts from '@/utils/getWorkouts';
import PageHeading from '@/components/PageHeading/PageHeading'
import WorkoutCards from './WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";

export default async function ActivityPage() {
	const session = await getServerSession(authOptions);
	const workouts = await getWorkouts(session.user.id)

	return (
		<>
			<PageHeading title="Activity" />
			<CardGrid>
				<WorkoutCards workouts={workouts} showDeleteButton={true} />
			</CardGrid>
		</>
	);
}
