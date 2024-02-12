import clsx from 'clsx';
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function DashboardChartCard({ children, title, colSpan } : { children: React.ReactNode, title: string, colSpan?: string }) {
    return (
        <Card shadow="none" className={clsx('shadow-md h-96', colSpan)}>
            <CardHeader className="p-3 tracking-tight text-lg">{title}</CardHeader>
            <CardBody className="p-3 text-black text-xs">{children}</CardBody>
        </Card>
    )
}
