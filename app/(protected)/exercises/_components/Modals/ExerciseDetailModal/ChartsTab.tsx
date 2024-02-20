'use client'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardBody, CardHeader } from "@nextui-org/card";

const data = [
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



export default function ChartsTab({ exerciseName } : { exerciseName: string | undefined }) {

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

    function Chart( { myData } : { myData: any }) {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={myData}
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
                <Chart myData={data} />
            </ChartCard>

            <ChartCard title='Total Volume'>
                <Chart myData={data} />
            </ChartCard>

            <ChartCard title='PR Progression (as 1RM)'>
                <Chart myData={data} />
            </ChartCard>

            <ChartCard title='Max Consecutive Reps'>
                <Chart myData={data} />
            </ChartCard>

        </div>
    )
}