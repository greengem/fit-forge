'use client'
import clsx from 'clsx';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Slider } from "@nextui-org/slider";

export default function DashboardChartCard({ children, title, colSpan }: { children: React.ReactNode, title: string, colSpan?: string }) {
    return (
        <Card shadow="none" className={clsx('shadow-md h-72', colSpan)}>
            <CardHeader className="p-3 tracking-tight gap-5 items-center">
                <p className='shrink-0 w-1/2 md:w-2/3'>{title}</p>
                <Slider
                    size="md"
                    isDisabled
                    step={10}
                    color="primary"
                    showSteps={true}
                    defaultValue={40}
                    maxValue={50}
                    minValue={0}
                    className="grow w-1/2 md:w-1/3"
                    marks={[
                        {
                            value: 0,
                            label: "1D",
                        },
                        {
                            value: 10,
                            label: "3D",
                        },
                        {
                            value: 20,
                            label: "1W",
                        },
                        {
                            value: 30,
                            label: "1M",
                        },
                        {
                            value: 40,
                            label: "3M",
                        },
                        {
                            value: 50,
                            label: "1Y",
                        },
                    ]}
                />
            </CardHeader>
            <CardBody className="p-3 text-black">{children}</CardBody>
        </Card>
    )
}