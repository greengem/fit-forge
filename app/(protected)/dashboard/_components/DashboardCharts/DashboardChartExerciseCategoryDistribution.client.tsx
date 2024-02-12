'use client'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

type ExerciseCategoryData = {
  category: string;
  count: number;
};

export default function DashboardChartExerciseCategoryDistributionClient({ data } : { data: ExerciseCategoryData[] }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="category" />
          <PolarRadiusAxis />
          <Radar name="Workouts" dataKey="count" stroke="#8884d8" fill="#A6FF00" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    );
}
