import { Suspense } from "react";
import DashboardCardTemplate from "./DashboardCardTemplate";
import DashboardCardAverageWorkoutDuration from "./DashboardCardAverageWorkoutDuration";
import DashboardCardDailyStreak from "./DashboardCardDailyStreak";
import DashboardCardWeeklyPbs from "./DashboardCardWeeklyPbs";
import DashboardCardWeeklyWorkouts from "./DashboardCardWeeklyWorkouts";
import { Spinner } from "@nextui-org/spinner";

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-3 mb-3">
      <Suspense
        fallback={
          <DashboardCardTemplate title="Weekly Workouts">
            <Spinner color="primary" />
          </DashboardCardTemplate>
        }
      >
        <DashboardCardWeeklyWorkouts />
      </Suspense>
      <Suspense
        fallback={
          <DashboardCardTemplate title="Avg Workout Time">
            <Spinner color="primary" />
          </DashboardCardTemplate>
        }
      >
        <DashboardCardAverageWorkoutDuration />
      </Suspense>
      <Suspense
        fallback={
          <DashboardCardTemplate title="Daily Streak">
            <Spinner color="primary" />
          </DashboardCardTemplate>
        }
      >
        <DashboardCardDailyStreak />
      </Suspense>
      <Suspense
        fallback={
          <DashboardCardTemplate title="Weekly PBs">
            <Spinner color="primary" />
          </DashboardCardTemplate>
        }
      >
        <DashboardCardWeeklyPbs />
      </Suspense>

      {/* <DashboardCardTemplate title="Goal One">1</DashboardCardTemplate>
      <DashboardCardTemplate title="Goal Two">2</DashboardCardTemplate>
      <DashboardCardTemplate title="Goal Three">3</DashboardCardTemplate>
      <DashboardCardTemplate title="Goal Four">4</DashboardCardTemplate> */}
    </div>
  );
}
