'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type WorkoutVolumeLoadData = {
  workoutLogId: string;
  date: Date;
  name: string;
  totalVolumeLoad: number;
};

export default function DashboardChartVolumeLoadClient({ data } : { data: WorkoutVolumeLoadData[] }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <Line type="monotone" dataKey="totalVolumeLoad" stroke="#A6FF00" />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    );
}