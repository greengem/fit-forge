import { Suspense } from "react";
import PageHeading from '@/components/PageHeading/PageHeading';
import DashboardGreeting from "./_components/DashBoardGreeting";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardChartWorkouts from "./_components/DashboardChartWorkouts";
import DashboardRecentActivity from "./_components/DashboardRecentActivity";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
import DashboardChartProgressOverTime from "./_components/DashboardCharts/DashboardChartProgressOverTime";
import DashboardChartWorkoutFrequency from "./_components/DashboardCharts/DashboardChartWorkoutFrequency";
import DashboardChartExerciseCategoryDistribution from "./_components/DashboardCharts/DashboardChartExerciseCategoryDistribution";
import DashboardChartVolumeLoad from "./_components/DashboardCharts/DashboardChartVolumeLoad";
import DashboardCharts from "./_components/DashboardCharts/DashboardCharts";

export default async function DashboardPage() {
	return (
		<>
			<PageHeading title="Dashboard" />
			<Suspense fallback={<div>Loading Greeting...</div>}>
				<DashboardGreeting />
			</Suspense>
			<DashboardCards />
			<DashboardLinks />
			<DashboardCharts />
			<Suspense fallback={<div>Loading Recent Activity...</div>}>
				<DashboardRecentActivity />
			</Suspense>
		</>
	);
}
