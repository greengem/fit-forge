import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { IconSettings } from "@tabler/icons-react";

export default function DashboardGoalTemplate({
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
      <CardHeader className="px-3 text-xs uppercase block w-full truncate flex justify-between items-center">
        <div className="flex gap-3 items-center">{icon}{title}</div>
        <IconSettings className="text-zinc-500" />
      </CardHeader>
      <CardBody className="px-3 pt-0 text-primary">
        <div className="mb-3">{children}</div>
      </CardBody>
    </Card>
  );
}
