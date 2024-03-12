// DashboardCardWeeklyPbs.tsx
import { IconTrophy } from "@tabler/icons-react";
import DashboardCardTemplate from "./DashboardCardTemplate";

export default function DashboardCardWeeklyPbs() {
  return (
    <DashboardCardTemplate
      title="Weekly PBs"
      icon={<IconTrophy className="text-danger" />}
    >
      ...
    </DashboardCardTemplate>
  );
}
