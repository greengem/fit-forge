import { Suspense } from "react";
import DashboardCardTemplate from "./DashboardCardTemplate";
import DashboardCardAverageWorkoutDuration from "./DashboardCardAverageWorkoutDuration";
import DashboardCardDailyStreak from "./DashboardCardDailyStreak";
import DashboardCardWeeklyPbs from "./DashboardCardWeeklyPbs";
import DashboardCardWeeklyWorkouts from "./DashboardCardWeeklyWorkouts";
import { Spinner } from "@nextui-org/spinner";
import { IconTarget } from "@tabler/icons-react";

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

      {/* <DashboardCardTemplate title="Goal One" icon={<IconTarget className="text-primary" />}>
        1
      </DashboardCardTemplate>
      <DashboardCardTemplate title="Goal Two" icon={<IconTarget className="text-primary" />}>
        2
      </DashboardCardTemplate>
      <DashboardCardTemplate title="Goal Three" icon={<IconTarget className="text-primary" />}>
        3
      </DashboardCardTemplate>
      <DashboardCardTemplate title="Goal Four" icon={<IconTarget className="text-primary" />}>
        4
      </DashboardCardTemplate> */}
    </div>
  );
}
