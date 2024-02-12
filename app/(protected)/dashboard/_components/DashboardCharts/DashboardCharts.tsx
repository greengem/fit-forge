import { Suspense } from "react";
import DashboardChartExerciseCategoryDistribution from "./DashboardChartExerciseCategoryDistribution";
import DashboardChartProgressOverTime from "./DashboardChartProgressOverTime";
import DashboardChartVolumeLoad from "./DashboardChartVolumeLoad";
import DashboardChartWorkoutFrequency from "./DashboardChartWorkoutFrequency";

export default function DashboardCharts(){
    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
            <DashboardChartWorkoutFrequency />
            <DashboardChartProgressOverTime />
            <DashboardChartVolumeLoad />
            <DashboardChartExerciseCategoryDistribution />
        </div>
    )
}