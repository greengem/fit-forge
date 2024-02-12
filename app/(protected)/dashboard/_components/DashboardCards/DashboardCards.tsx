import { Suspense } from "react";
import DashboardCardTemplate from "./DashboardCardTemplate";
import DashboardCardAverageWorkoutDuration from "./DashboardCardAverageWorkoutDuration";
import DashboardCardDailyStreak from "./DashboardCardDailyStreak";
import DashboardCardWeeklyPbs from "./DashboardCardWeeklyPbs";
import DashboardCardWeeklyWorkouts from "./DashboardCardWeeklyWorkouts";
import {Spinner} from "@nextui-org/spinner";

export default function DashboardCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
            <Suspense fallback={<DashboardCardTemplate title="Weekly Workouts"><Spinner color="primary" /></DashboardCardTemplate>}>
                <DashboardCardWeeklyWorkouts />
            </Suspense>
            <Suspense fallback={<DashboardCardTemplate title="Weekly Workouts"><Spinner color="primary" /></DashboardCardTemplate>}>
                <DashboardCardAverageWorkoutDuration />
            </Suspense>
            <Suspense fallback={<DashboardCardTemplate title="Weekly Workouts"><Spinner color="primary" /></DashboardCardTemplate>}>
                <DashboardCardDailyStreak />
            </Suspense>
            <Suspense fallback={<DashboardCardTemplate title="Weekly Workouts"><Spinner color="primary" /></DashboardCardTemplate>}>
                <DashboardCardWeeklyPbs />
            </Suspense>
        </div>
    )
}