'use client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type WorkoutFrequencyData = {
  week: string;
  workouts: number;
};

export default function DashboardChartWorkoutFrequencyClient({ data } : { data: WorkoutFrequencyData[] }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Bar dataKey="workouts" fill="#A6FF00" />
          <XAxis dataKey="week" />
          <Tooltip />
        </BarChart>
      </ResponsiveContainer>
    );
}
