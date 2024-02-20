'use client'
import useSWR from 'swr';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody, CardHeader } from "@nextui-org/card";

const mockData = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

interface Set {
    id: string;
    workoutLogExerciseId: string;
    weight: number;
    reps: number;
    exerciseDuration?: number;
    order?: number;
}

interface Exercise {
    id: string;
    workoutLogId: string;
    exerciseId: string;
    sets: Set[];
}

interface WorkoutLog {
    id: string;
    userId: string;
    workoutPlanId?: string;
    name: string;
    date: Date;
    duration: number;
    createdAt: Date;
    date_updated?: Date;
    exercises: Exercise[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ChartsTab({ exerciseId, exerciseName } : { exerciseId: string | undefined, exerciseName: string | undefined }) {
    const { data, error } = useSWR<WorkoutLog[]>(`/api/exercise-charts/${exerciseId}`, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;
    if (data.length === 0) return <div className='text-zinc-500'>Previous performances of this exercise will display here - check back later!</div>;

    function ChartCard({ children, title } : { children: React.ReactNode, title: string }) {
        return (
            <Card shadow="none" className="shadow-md ring-2 ring-zinc-800">
                <CardHeader className="flex-col items-start">
                    <h4>{exerciseName}</h4>
                    <p className="text-sm text-zinc-500">{title}</p>
                </CardHeader>
                <CardBody className='h-44'>{children}</CardBody>
            </Card>   
        )
    }

    function Chart( { data } : { data: any }) {
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
                    <XAxis dataKey="name" fontSize={10} />
                    <Tooltip />
                    <Line type="monotone" dataKey="pv" stroke="#A6FF00" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        )
    }
    

    return (
        <div className="space-y-3">

            <ChartCard title='Best Set'>
                <Chart data={mockData} />
            </ChartCard>

            <ChartCard title='Total Volume'>
                <Chart data={mockData} />
            </ChartCard>

            <ChartCard title='PR Progression (as 1RM)'>
                <Chart data={mockData} />
            </ChartCard>

            <ChartCard title='Max Consecutive Reps'>
                <Chart data={mockData} />
            </ChartCard>

        </div>
    )
}