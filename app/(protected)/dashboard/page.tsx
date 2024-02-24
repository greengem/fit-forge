import { Suspense } from "react";
import PageHeading from "@/components/PageHeading/PageHeading";
import DashboardLinks from "./_components/DashboardLinks";
import DashboardRecentActivity from "./_components/DashboardRecentActivity";
import DashboardCards from "./_components/DashboardCards/DashboardCards";
import DashboardCharts from "./_components/DashboardCharts/DashboardCharts";
import DashboardHeatmap from "./_components/DashboardHeatmap";

export default function DashboardPage({
  searchParams,
}: {
  searchParams?: {
    chart1?: string;
    chart2?: string;
    chart3?: string;
    chart4?: string;
  };
}) {
  const chart1DateRange = searchParams?.chart1 || "1W";
  const chart2DateRange = searchParams?.chart2 || "1W";
  const chart3DateRange = searchParams?.chart3 || "1W";
  const chart4DateRange = searchParams?.chart4 || "1W";

  return (
    <>
      <PageHeading title="Dashboard" />
      <DashboardCards />
      <DashboardCharts
        chart1DateRange={chart1DateRange}
        chart2DateRange={chart2DateRange}
        chart3DateRange={chart3DateRange}
        chart4DateRange={chart4DateRange}
      />
      {/* <DashboardHeatmap /> */}
      <DashboardLinks />
      <Suspense fallback={<div>Loading Recent Activity...</div>}>
        <DashboardRecentActivity />
      </Suspense>
    </>
  );
}
