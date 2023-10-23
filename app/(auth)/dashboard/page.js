import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getWorkouts from '@/utils/getWorkouts';
import PageHeading from '@/components/PageHeading/PageHeading'
import DashboardCards from './DashboardCards';
import WorkoutCards from '@/app/(auth)/activity/WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";
import Link from "next/link";

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
			<div className="text-center mt-5">
			<Link className="text-primary" href="/activity">View all activity</Link>
			</div>
			
		</>
	);
}
