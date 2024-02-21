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
      <CardHeader className="px-5">{title}</CardHeader>
      <CardBody className="text-5xl pt-0 text-primary gap-y-3">
        {children}
      </CardBody>
    </Card>
  );
}
