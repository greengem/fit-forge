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
import DashboardChartWorkouts from "./_components/DashboardChartWorkouts";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.id;
	const twoWorkouts = await getWorkouts(userId, 2, 'desc');
	const workouts = await getWorkouts(userId, null, 'asc');
	const personalBests = await getPbs(userId);
	const personalBestsLastWeek = await getPbs(userId, true);
	const numberOfPBsLastWeek = personalBestsLastWeek.length;

	return (
		<>
			<PageHeading title="Dashboard" />
			<DashboardGreeting userName={session.user.name} />
			<DashboardCards workouts={workouts} numberOfPBsLastWeek={numberOfPBsLastWeek} />
			<DashboardLinks />
				<DashboardChartWorkouts workouts={workouts} />
			<PageHeading title="Recent Activity" />
			<CardGrid>
				<WorkoutCards workouts={twoWorkouts} personalBests={personalBests} showDeleteButton={false} />
			</CardGrid>
			<div className="text-center mt-5">
				<Button variant="ghost" as={Link} href="/activity">View all activity</Button>
			</div>
		</>
	);
}
