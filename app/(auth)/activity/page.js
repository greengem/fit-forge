import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import getWorkouts from '@/utils/getWorkouts';
import getPbs from '@/utils/getPbs';
import PageHeading from '@/components/PageHeading/PageHeading'
import WorkoutCards from './_components/WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";

export default async function ActivityPage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.id;
	const workouts = await getWorkouts(userId)
	const personalBests = await getPbs(userId)

	return (
		<>
			<PageHeading title="Activity" />
			<CardGrid>
				<WorkoutCards workouts={workouts} personalBests={personalBests} showDeleteButton={true} />
			</CardGrid>
		</>
	);
}
