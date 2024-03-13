import { Card, CardHeader, CardBody } from "@nextui-org/card";
export default function DashboardCardTemplate({
  children,
  title,
  icon,
}: {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}) {
  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="px-3 text-xs uppercase block w-full truncate flex gap-3">
        {icon}
        {title}
      </CardHeader>
      <CardBody className="px-3 text-4xl pt-0 text-black dark:text-primary">
        {children}
      </CardBody>
    </Card>
  );
}
