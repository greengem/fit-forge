'use client'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

type ExerciseCategoryData = {
  category: string;
  count: number;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DashboardChartExerciseCategoryDistributionClient({ data } : { data: ExerciseCategoryData[] }) {
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
            {
              data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    );
}