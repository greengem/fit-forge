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
	//Get user id
	const session = await getServerSession(authOptions);
	const userId = session.user.id;

	//Set 2 Recent Activities
	const recentActivity = await getWorkouts(userId, 4);

	//Set Chart Activity
	const workouts = await getWorkouts(userId);
	const workoutsChart = [...workouts].reverse();

	//Set All Personal Bests
	const personalBests = await getPbs(userId);

	//Set Weekly Personal Bests
	const personalBestsLastWeek = await getPbs(userId, true);
	const numberOfPBsLastWeek = personalBestsLastWeek.length;

	return (
		<>
			<PageHeading title="Dashboard" />
			<DashboardGreeting userName={session.user.name} />
			<DashboardCards workouts={workouts} personalBests={numberOfPBsLastWeek} />
			<DashboardLinks />
			<DashboardChartWorkouts workouts={workoutsChart} />
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
