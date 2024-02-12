'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type WorkoutData = {
  date: Date;
  totalWeight: number;
};

export default function DashboardChartProgressOverTimeClient({ data } : { data: WorkoutData[] }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Area type="monotone" dataKey="totalWeight" stroke="#A6FF00" fill="#A6FF00" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    );
}