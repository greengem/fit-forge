import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import getWorkouts from '@/app/lib/getWorkouts';
import getPbs from '@/app/lib/getPbs';
import PageHeading from '@/components/PageHeading/PageHeading'
import DashboardCards from './_components/DashboardCards';
import WorkoutCards from '@/app/(auth)/activity/_components/WorkoutCards';
import CardGrid from "@/components/Grid/CardGrid";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardGreeting from "./_components/DashBoardGreeting";
import DashboardChartWorkouts from "./_components/DashboardChartWorkouts";
import DashboardChartDuration from "./_components/DashboardChartDuration";
import Link from "next/link";
import { Button } from "@nextui-org/button";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const userId = session.user.id;
	const recentActivity = await getWorkouts(userId, 4);
	const workouts = await getWorkouts(userId);
	const workoutsChart = [...workouts].reverse();
	const personalBests = await getPbs(userId);
	const personalBestsLastWeek = await getPbs(userId, true);
	const numberOfPBsLastWeek = personalBestsLastWeek.length;

	return (
		<>
			<PageHeading title="Dashboard" />
			<DashboardGreeting userName={session.user.name} />
			<DashboardCards workouts={workouts} personalBests={numberOfPBsLastWeek} />
			<DashboardLinks />
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
				<DashboardChartWorkouts workouts={workoutsChart} />
				<DashboardChartDuration workouts={workoutsChart} />
			</div>
			<PageHeading title="Recent Activity" />
			<CardGrid>
				<WorkoutCards workouts={recentActivity} personalBests={personalBests} showDeleteButton={false} />
			</CardGrid>
			<div className="text-center mt-5">
				<Button variant="ghost" as={Link} href="/activity">View all activity</Button>
			</div>
		</>
	);
}
