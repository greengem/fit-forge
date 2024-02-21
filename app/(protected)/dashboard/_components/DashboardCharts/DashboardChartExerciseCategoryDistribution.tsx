import { auth } from "@clerk/nextjs";
import prisma from "@/prisma/prisma";
import DashboardChartExerciseCategoryDistributionPieClient from "./DashboardChartExerciseCategoryDistributionPie.client";
import {
  calculateIntervals,
  getIntervalStartAndEndDates,
} from "./utils/dateUtils";

type ExerciseCategoryData = {
  category: string;
  count: number;
};

export default async function DashboardChartExerciseCategoryDistribution({
  dateRange = "3M",
}: {
  dateRange?: string;
}) {
  const { userId }: { userId: string | null } = auth();

  if (!userId) {
    throw new Error("You must be signed in to view this page.");
  }

  const intervals = calculateIntervals(dateRange);
  const startDate = intervals[0];
  const endDate = new Date();

  const categoryCounts = await prisma.exercise.groupBy({
    by: ["category"],
    _count: {
      id: true,
    },
    where: {
      logExercises: {
        some: {
          WorkoutLog: {
            userId: userId,
            date: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
    },
  });

  const allCategories = [
    "strength",
    "stretching",
    "plyometrics",
    "strongman",
    "powerlifting",
    "cardio",
    "olympic weightlifting",
  ];

  const radarChartData: ExerciseCategoryData[] = allCategories.map(
    (category) => {
      const categoryData = categoryCounts.find(
        (item) => item.category === category,
      );
      return {
        category,
        count: categoryData ? categoryData._count.id : 0,
      };
    },
  );

  return (
    <DashboardChartExerciseCategoryDistributionPieClient
      data={radarChartData}
    />
  );
}
