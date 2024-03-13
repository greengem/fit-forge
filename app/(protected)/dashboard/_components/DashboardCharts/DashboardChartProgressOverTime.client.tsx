"use client";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import ChartMockDataMessage from "./ChartMockDataMessage";

type WorkoutData = {
  period: string;
  totalWeight: number;
};

function CustomTooltip({
  active,
  payload,
  label,
}: TooltipProps<number, string>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 text-white px-4 py-2 rounded-xl shadow-xl text-xs">
        <p className="font-semibold">
          Weight: <span className="text-primary">{payload[0].value}</span> Kg
        </p>
        <p>Period: {label}</p>
      </div>
    );
  }

  return null;
}

export default function DashboardChartProgressOverTimeClient({
  data,
  isUsingMockData,
}: {
  data: WorkoutData[];
  isUsingMockData?: boolean;
}) {
  return (
    <>
      {isUsingMockData && (<ChartMockDataMessage />)}

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          aria-label="Progress Over Time Area Chart"
        >
          <Area
            type="monotone"
            dataKey="totalWeight"
            stroke="#000000"
            fill="#000000"
            aria-label="Total Weight Area"
          />
          <XAxis dataKey="period" tick={{ fontSize: "10px" }} />
          <Tooltip content={<CustomTooltip />} />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
