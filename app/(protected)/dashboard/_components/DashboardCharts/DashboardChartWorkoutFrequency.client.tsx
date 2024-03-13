"use client";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
  CartesianGrid,
} from "recharts";
import ChartMockDataMessage from "./ChartMockDataMessage";

type WorkoutFrequencyData = {
  period: string;
  workouts: number;
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
          Workouts: <span className="text-primary">{payload[0].value}</span>
        </p>
        <p>Period: {label}</p>
      </div>
    );
  }

  return null;
}

export default function DashboardChartWorkoutFrequencyClient({
  data,
  isUsingMockData,
}: {
  data: WorkoutFrequencyData[];
  isUsingMockData?: boolean;
}) {
  return (
    <>
      {isUsingMockData && (<ChartMockDataMessage />)}

      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          aria-label="Workouts Bar Chart"
        >
          <Bar dataKey="workouts" fill="#000000" />
          <XAxis dataKey="period" tick={{ fontSize: "10px" }} />
          <Tooltip content={<CustomTooltip />} cursor={false} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
