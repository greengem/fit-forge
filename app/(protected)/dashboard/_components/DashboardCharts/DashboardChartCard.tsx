import clsx from 'clsx';
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import DashboardChartDateRange from './DashboardChartDateRange';

export default function DashboardChartCard({ children, title, colSpan, chartId }: { children: React.ReactNode, title: string, colSpan?: string, chartId: number }) {
    return (
        <Card shadow="none" className={clsx('shadow-md h-72', colSpan)}>
            <CardHeader className="p-3 tracking-tight gap-5 items-start justify-between">
                <p className='shrink-0 w-1/2'>{title}</p>
                <DashboardChartDateRange chartId={chartId} />
            </CardHeader>
            <CardBody className="p-3 pb-0 text-black">{children}</CardBody>
        </Card>
    )
}
 