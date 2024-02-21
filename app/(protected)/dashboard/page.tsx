import { Suspense } from "react";
import PageHeading from '@/components/PageHeading/PageHeading';
import DashboardLinks from "./_components/DashboardLinks";
import DashboardRecentActivity from "./_components/DashboardRecentActivity";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
import DashboardCharts from "./_components/DashboardCharts/DashboardCharts";

export default function DashboardPage({ 
	searchParams 
} : {
	searchParams?: {
		chart1?: string,
		chart2?: string,
		chart3?: string,
		chart4?: string,
	  };
}) {
	const chart1DateRange = searchParams?.chart1 || '3M';
	const chart2DateRange = searchParams?.chart2 || '3M';
	const chart3DateRange = searchParams?.chart3 || '3M';
	const chart4DateRange = searchParams?.chart4 || '3M';

	return (
		<>
			<PageHeading title="Dashboard" />
			<DashboardCards />
			{/* <DashboardLinks /> */}
			<DashboardCharts 
				chart1DateRange={chart1DateRange} 
				chart2DateRange={chart2DateRange} 
				chart3DateRange={chart3DateRange} 
				chart4DateRange={chart4DateRange} 
			/>
			<Suspense fallback={<div>Loading Recent Activity...</div>}>
				<DashboardRecentActivity />
			</Suspense>
		</>
	);
}
