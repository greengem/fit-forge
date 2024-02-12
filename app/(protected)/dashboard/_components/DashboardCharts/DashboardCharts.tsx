import { Suspense } from "react";
import DashboardChartExerciseCategoryDistribution from "./DashboardChartExerciseCategoryDistribution";
import DashboardChartProgressOverTime from "./DashboardChartProgressOverTime";
import DashboardChartVolumeLoad from "./DashboardChartVolumeLoad";
import DashboardChartWorkoutFrequency from "./DashboardChartWorkoutFrequency";

export default function DashboardCharts({ userId } : { userId: string }){
    return (
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartWorkoutFrequency userId={userId} /></Suspense>
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartProgressOverTime userId={userId} /></Suspense>
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartVolumeLoad userId={userId} /></Suspense>
            <Suspense fallback={<div>Loading Chart...</div>}><DashboardChartExerciseCategoryDistribution userId={userId} /></Suspense>
        </div>
    )
}