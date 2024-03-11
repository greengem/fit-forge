"use client";
import useSWR from "swr";
import { useMemo } from "react";
import {
  parseISO,
  startOfWeek,
  eachWeekOfInterval,
  format,
  subMonths,
} from "date-fns";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { TooltipProps } from "recharts";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Spinner } from "@nextui-org/spinner";
import { WorkoutLog } from "./ModalChartTypes";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function generateLastThreeMonthsWeeks() {
  const end = new Date();
  const start = subMonths(end, 3);
  return eachWeekOfInterval({ start, end }).map((weekStart) =>
    format(weekStart, "MMM d"),
  );
}

interface GroupedWorkouts {
  [week: string]: WorkoutLog[];
}

function groupWorkoutsByWeek(workouts: WorkoutLog[]): GroupedWorkouts {
  return workouts.reduce((acc: GroupedWorkouts, workout) => {
    const weekStart = format(startOfWeek(parseISO(workout.date)), "MMM d");
    acc[weekStart] = acc[weekStart] || [];
    acc[weekStart].push(workout);
    return acc;
  }, {});
}

function calculateWeeklyMetrics(groupedWorkouts: GroupedWorkouts) {
  return Object.entries(groupedWorkouts).map(([week, workouts]) => {
    let totalVolume = 0;
    let heaviestSet = 0;
    let maxConsecutiveReps = 0;
    let estimated1RM = 0;

    workouts.forEach((workout) => {
      workout.exercises.forEach((exercise) => {
        exercise.sets.forEach((set) => {
          const volume = set.weight * set.reps;
          totalVolume += volume;
          heaviestSet = Math.max(heaviestSet, set.weight);
          maxConsecutiveReps = Math.max(maxConsecutiveReps, set.reps);

          const setEstimated1RM = set.weight * (1 + set.reps / 30);
          estimated1RM = Math.max(estimated1RM, setEstimated1RM);
        });
      });
    });

    return {
      week,
      bestSet: heaviestSet,
      totalVolume,
      prProgression: estimated1RM,
      maxConsecutiveReps,
    };
  });
}

function prepareChartData(workouts: WorkoutLog[], weeks: string[]) {
  const groupedWorkouts = groupWorkoutsByWeek(workouts);
  const weeklyMetrics = calculateWeeklyMetrics(groupedWorkouts);

  return weeks.map((week) => {
    const weeklyMetric = weeklyMetrics.find((wm) => wm.week === week) ?? {
      bestSet: 0,
      totalVolume: 0,
      prProgression: 0,
      maxConsecutiveReps: 0,
    };

    return {
      week,
      bestSet: weeklyMetric.bestSet,
      totalVolume: weeklyMetric.totalVolume,
      prProgression: weeklyMetric.prProgression,
      maxConsecutiveReps: weeklyMetric.maxConsecutiveReps,
    };
  });
}

const getFriendlyName = (key: string): string => {
  const mappings: { [key: string]: string } = {
    bestSet: "Best Set",
    totalVolume: "Total Volume",
    prProgression: "PR Progression",
    maxConsecutiveReps: "Max Consecutive Reps",
  };
  return mappings[key] || key;
};

function CustomTooltip({ active, payload, label }: TooltipProps<any, any>) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-800 text-white px-4 py-2 rounded-xl shadow-xl text-xs">
        <p>{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
          >{`${getFriendlyName(entry.name)}: ${entry.value}`}</p>
        ))}
      </div>
    );
  }

  return null;
}

export default function ChartsTab({
  exerciseId,
  exerciseName,
}: {
  exerciseId: string | undefined;
  exerciseName: string | undefined;
}) {
  const { data, error } = useSWR<WorkoutLog[]>(
    `/api/exercise-history/${exerciseId}`,
    fetcher,
  );
  const weeks = useMemo(() => generateLastThreeMonthsWeeks(), []);

  const chartData = useMemo(() => {
    if (!data || data.length === 0)
      return weeks.map((week) => ({
        week,
        bestSet: 0,
        totalVolume: 0,
        prProgression: 0,
        maxConsecutiveReps: 0,
      }));
    return prepareChartData(data, weeks);
  }, [data, weeks]);

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="py-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (data.length === 0)
    return (
      <div className="text-zinc-500">
        Previous performances of this exercise will display here - check back
        later!
      </div>
    );

  function ChartCard({
    children,
    title,
  }: {
    children: React.ReactNode;
    title: string;
  }) {
    return (
      <Card shadow="none" className="shadow-md ring-2 ring-zinc-800">
        <CardHeader className="flex-col items-start">
          <h4>{exerciseName}</h4>
          <p className="text-sm text-zinc-500">{title}</p>
        </CardHeader>
        <CardBody className="h-32 overflow-hidden">{children}</CardBody>
      </Card>
    );
  }

  function Chart({ data, dataKey }: { data: any; dataKey: string }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="week" fontSize={10} />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#A6FF00"
            activeDot={{ r: 4 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    );
  }

  return (
    <div className="space-y-3">
      <ChartCard title="Best Set">
        <Chart data={chartData} dataKey="bestSet" />
      </ChartCard>

      <ChartCard title="Total Volume">
        <Chart data={chartData} dataKey="totalVolume" />
      </ChartCard>

      <ChartCard title="PR Progression (as 1RM)">
        <Chart data={chartData} dataKey="prProgression" />
      </ChartCard>

      <ChartCard title="Max Consecutive Reps">
        <Chart data={chartData} dataKey="maxConsecutiveReps" />
      </ChartCard>
    </div>
  );
}
