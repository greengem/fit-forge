import DashboardChartExerciseCategoryDistribution from "./DashboardChartExerciseCategoryDistribution";
import DashboardChartProgressOverTime from "./DashboardChartProgressOverTime";
import DashboardChartVolumeLoad from "./DashboardChartVolumeLoad";
import DashboardChartWorkoutFrequency from "./DashboardChartWorkoutFrequency";

export default function DashboardCharts(){
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            <DashboardChartProgressOverTime />
            <DashboardChartVolumeLoad />
            <DashboardChartWorkoutFrequency />
            <DashboardChartExerciseCategoryDistribution />
        </div>
    )
}