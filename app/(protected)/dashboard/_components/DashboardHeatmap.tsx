import { format } from 'date-fns';
import DashboardHeatmapClient from './DashboardHeatmap.client';
import prisma from '@/prisma/prisma';

export default async function DashboardHeatmap() {
  const logs = await prisma.workoutLog.findMany({
    select: {
      date: true
    }
  });

  const counts = logs.reduce((acc, log) => {
    const date = format(log.date, 'yyyy-MM-dd');
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const values = Object.entries(counts).map(([date, count]) => ({ date, count }));

  return (
    <DashboardHeatmapClient values={values} />
  );
}