"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

type ExerciseCategoryData = {
  category: string;
  count: number;
};

const COLORS = ["#A6FF00", "#00A5FF", "#62EF6E", "#FFEA07", "#f11450"];

export default function DashboardChartExerciseCategoryDistributionClient({
  data,
}: {
  data: ExerciseCategoryData[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="category"
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
