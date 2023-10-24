import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"
import getWorkouts from '@/utils/getWorkouts';
import getPbs from '@/utils/getPbs';
import PageHeading from '@/components/PageHeading/PageHeading'
import DashboardCards from './_components/DashboardCards';
import WorkoutCards from '@/app/(auth)/activity/_components/WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardGreeting from "./_components/DashBoardGreeting";
import DashboardChart from "./_components/DashboardChart";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.id;
	const workouts = await getWorkouts(userId, 2)
	const personalBests = await getPbs(userId)

	return (
		<>
			<PageHeading title="Dashboard" />
			<DashboardGreeting userName={session.user.name} />
			<DashboardCards workouts={workouts} />
			<DashboardLinks />
			<DashboardChart />
			<PageHeading title="Recent Activity" />
			<CardGrid>
				<WorkoutCards workouts={workouts} personalBests={personalBests} showDeleteButton={false} />
			</CardGrid>
			<div className="text-center mt-5">
				<Button variant="ghost" as={Link} href="/activity">View all activity</Button>
			</div>
		</>
	);
}
