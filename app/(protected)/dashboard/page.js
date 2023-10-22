import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getWorkouts from '@/utils/getWorkouts';
import PageHeading from '@/components/PageHeading/PageHeading'
import DashboardCards from './DashboardCards';
import WorkoutCards from '@/app/(protected)/activity/WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const workouts = await getWorkouts(session.user.id, 2)

	return (
		<>
			<PageHeading title="Dashboard" />
			<DashboardCards workouts={workouts} />
			<PageHeading title="Recent Activity" />
			<CardGrid>
				<WorkoutCards workouts={workouts} showDeleteButton={false} />
			</CardGrid>
		</>
	);
}
