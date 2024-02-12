import { Suspense } from "react";
import PageHeading from '@/components/PageHeading/PageHeading';
import DashboardGreeting from "./_components/DashBoardGreeting";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardRecentActivity from "./_components/DashboardRecentActivity";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
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
			<Suspense fallback={<div>Loading Recent Activity...</div>}>
				<DashboardRecentActivity />
			</Suspense>
		</>
	);
}
