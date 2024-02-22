import { Card, CardHeader, CardBody } from "@nextui-org/card";
export default function DashboardCardTemplate({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="px-3 text-xs uppercase truncate">{title}</CardHeader>
      <CardBody className="px-3 text-4xl pt-0 text-primary">
        {children}
      </CardBody>
    </Card>
  );
}
