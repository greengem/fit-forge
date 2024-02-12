import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/authOptions"
import PageHeading from '@/components/PageHeading/PageHeading';
import DashboardGreeting from "./_components/DashBoardGreeting";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardRecentActivity from "./_components/DashboardRecentActivity";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
import DashboardCharts from "./_components/DashboardCharts/DashboardCharts";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);
	const userName = session?.user?.name;
	const userId = session?.user.name;

	if (!userName || !userId) {
        return <div>Error: User name or user ID is missing.</div>;
    }
	
	return (
		<>
			<PageHeading title="Dashboard" />
			<Suspense fallback={<div>Loading Greeting...</div>}>
				<DashboardGreeting userName={userName} />
			</Suspense>
			<DashboardCards userId={userId} />
			<DashboardLinks />
			<DashboardCharts userId={userId} />
			<Suspense fallback={<div>Loading Recent Activity...</div>}>
				<DashboardRecentActivity userId={userId} />
			</Suspense>
		</>
	);
}
