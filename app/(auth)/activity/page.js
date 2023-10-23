import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import getWorkouts from '@/utils/getWorkouts';
import PageHeading from '@/components/PageHeading/PageHeading'
import WorkoutCards from './_components/WorkoutCards';
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
