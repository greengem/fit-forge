import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getWorkouts from '@/utils/getWorkouts';
import PageHeading from '@/components/PageHeading/PageHeading'
import DashboardCards from './_components/DashboardCards';
import WorkoutCards from '@/app/(auth)/activity/_components/WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";
import DashboardLinks from "./_components/DashboardLinks";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const workouts = await getWorkouts(session.user.id, 2)

	return (
		<>
			<PageHeading title="Dashboard" />
			<DashboardCards workouts={workouts} />
			<DashboardLinks />
			<PageHeading title="Recent Activity" />
			<CardGrid>
				<WorkoutCards workouts={workouts} showDeleteButton={false} />
			</CardGrid>
			<div className="text-center mt-5">
				<Button variant="ghost" as={Link} href="/activity">View all activity</Button>
			</div>
		</>
	);
}
