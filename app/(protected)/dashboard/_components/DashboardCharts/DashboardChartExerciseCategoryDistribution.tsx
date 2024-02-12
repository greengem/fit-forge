import prisma from "@/db/prisma";
import DashboardChartCard from './DashboardChartCard';
import DashboardChartExerciseCategoryDistributionClient from "./DashboardChartExerciseCategoryDistribution.client";

type ExerciseCategoryData = {
  category: string;
  count: number;
};

const mockData = [
  { category: 'strength', count: 6 },
  { category: 'stretching', count: 5 },
  { category: 'plyometrics', count: 7 },
  { category: 'strongman', count: 3 },
  { category: 'powerlifting', count: 8 },
  { category: 'cardio', count: 5 },
  { category: 'olympic weightlifting', count: 2 }
];

export default async function DashboardChartExerciseCategoryDistribution({ userId } : { userId: string }) {

  const categoryCounts = await prisma.exercise.groupBy({
    by: ['category'],
    _count: {
      id: true,
    },
    where: {
      logExercises: {
        some: {
          WorkoutLog: {
            userId: userId,
          },
        },
      },
    },
  });

  const allCategories = [
    'strength', 
    'stretching', 
    'plyometrics', 
    'strongman', 
    'powerlifting', 
    'cardio', 
    'olympic weightlifting'
  ];

  const radarChartData: ExerciseCategoryData[] = allCategories.map(category => {
    const categoryData = categoryCounts.find(item => item.category === category);
    return {
      category,
      count: categoryData ? categoryData._count.id : 0,
    };
  });

  //console.log(radarChartData);

  return (
    <DashboardChartCard title='Exercise Category Distribution' colSpan="col-span-2">
      <DashboardChartExerciseCategoryDistributionClient data={mockData} />
    </DashboardChartCard>
  );
}
