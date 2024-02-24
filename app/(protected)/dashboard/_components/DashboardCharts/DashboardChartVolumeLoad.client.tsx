"use client";
import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";

type WorkoutData = {
  period: string;
  totalVolumeLoad: number;
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
          Volume Load: <span className="text-primary">{payload[0].value}</span>{" "}
          Kg
        </p>
        <p>Period: {label}</p>
      </div>
    );
  }

  return null;
}

export default function DashboardChartVolumeLoadClient({
  data,
}: {
  data: WorkoutData[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
        <Line type="monotone" dataKey="totalVolumeLoad" stroke="#A6FF00" />
        <XAxis dataKey="period" tick={{ fontSize: "10px" }} />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  );
}
