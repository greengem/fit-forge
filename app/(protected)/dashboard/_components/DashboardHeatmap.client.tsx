'use client'
import { subMonths } from 'date-fns';
import { Card, CardBody } from '@nextui-org/react';

type HeatmapValue = {
  date: string;
  count: number;
};

type DashboardHeatmapClientProps = {
  values: HeatmapValue[];
};

export default function DashboardHeatmapClient({ values }: DashboardHeatmapClientProps) {
  //console.log(values);
  const endDate = new Date();
  const startDate = subMonths(endDate, 12);

  return (
    <Card className='mb-3'>
      <CardBody className='h-64'>
        <></>
      </CardBody>
    </Card>
  );
}
