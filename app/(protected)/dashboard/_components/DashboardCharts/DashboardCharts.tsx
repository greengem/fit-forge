import { Suspense } from "react";
//import DashboardChartExerciseCategoryDistribution from "./DashboardChartExerciseCategoryDistribution";
import DashboardChartProgressOverTime from "./DashboardChartProgressOverTime";
import DashboardChartVolumeLoad from "./DashboardChartVolumeLoad";
import DashboardChartWorkoutFrequency from "./DashboardChartWorkoutFrequency";
import DashboardChartCard from "./DashboardChartCard";
import {
  IconChartAreaFilled,
  IconChartBar,
  IconChartLine,
  IconChartPie,
  IconChartRadar,
} from "@tabler/icons-react";

export default function DashboardCharts({
  chart1DateRange,
  chart2DateRange,
  chart3DateRange,
  chart4DateRange,
}: {
  chart1DateRange?: string;
  chart2DateRange?: string;
  chart3DateRange?: string;
  chart4DateRange?: string;
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-3">
      <DashboardChartCard
        icon={<IconChartBar className="text-danger" />}
        title="Frequency"
        colSpan="col-span-2 lg:col-span-4 xl:col-span-2"
        chartId={1}
      >
        <Suspense fallback={<div>Loading Chart...</div>}>
          <DashboardChartWorkoutFrequency dateRange={chart1DateRange} />
        </Suspense>
      </DashboardChartCard>

      <DashboardChartCard
        icon={<IconChartAreaFilled className="text-danger" />}
        title="Progress"
        colSpan="col-span-2"
        chartId={2}
      >
        <Suspense fallback={<div>Loading Chart...</div>}>
          <DashboardChartProgressOverTime dateRange={chart2DateRange} />
        </Suspense>
      </DashboardChartCard>

      <DashboardChartCard
        icon={<IconChartLine className="text-danger" />}
        title="Volume Load"
        colSpan="col-span-2"
        chartId={3}
      >
        <Suspense fallback={<div>Loading Chart...</div>}>
          <DashboardChartVolumeLoad dateRange={chart3DateRange} />
        </Suspense>
      </DashboardChartCard>

      {/* <DashboardChartCard 
        icon={<IconChartRadar />} 
        title='Exercise Split' 
        colSpan="col-span-2" 
        chartId={4}
      >
        <Suspense fallback={<div>Loading Chart...</div>}>
          <DashboardChartExerciseCategoryDistribution dateRange={chart4DateRange} />
        </Suspense>
      </DashboardChartCard> */}
    </div>
  );
}
