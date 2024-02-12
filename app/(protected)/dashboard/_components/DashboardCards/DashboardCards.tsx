import { Suspense } from "react";
import DashboardCardAverageWorkoutDuration from "./DashboardCardAverageWorkoutDuration";
import DashboardCardDailyStreak from "./DashboardCardDailyStreak";
import DashboardCardWeeklyPbs from "./DashboardCardWeeklyPbs";
import DashboardCardWeeklyWorkouts from "./DashboardCardWeeklyWorkouts";

export default function DashboardCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
            <DashboardCardWeeklyWorkouts />
            <DashboardCardAverageWorkoutDuration />
            <DashboardCardDailyStreak />
            <DashboardCardWeeklyPbs />
        </div>
    )
}