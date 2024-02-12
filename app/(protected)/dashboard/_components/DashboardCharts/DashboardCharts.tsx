import { Suspense } from "react";
import DashboardChartExerciseCategoryDistribution from "./DashboardChartExerciseCategoryDistribution";
import DashboardChartProgressOverTime from "./DashboardChartProgressOverTime";
import DashboardChartVolumeLoad from "./DashboardChartVolumeLoad";
import DashboardChartWorkoutFrequency from "./DashboardChartWorkoutFrequency";

export default function DashboardCharts(){
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartProgressOverTime /></Suspense>
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartVolumeLoad /></Suspense>
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartWorkoutFrequency /></Suspense>
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartExerciseCategoryDistribution /></Suspense>
        </div>
    )
}