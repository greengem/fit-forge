'use client'
import { subMonths } from 'date-fns';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { IconCalendar } from '@tabler/icons-react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

type HeatmapValue = {
  date: string;
  count: number;
};

type DashboardHeatmapClientProps = {
  values: HeatmapValue[];
};

export default function DashboardHeatmapClient({ values }: DashboardHeatmapClientProps) {
  //console.log(values);
  const startDate = subMonths(new Date(), 12);
  const endDate = new Date();

  return (
    <Card className='mb-3 shadow-md' shadow='none'>
      <CardHeader className="p-3 gap-x-3 flex items-center gap-x-3 truncate text-xs uppercase">
          <span className="text-primary"><IconCalendar /></span> Heatmap
      </CardHeader>
      <CardBody className='p-3 pt-0'>
        <div className='overflow-x-scroll relative no-scrollbar text-xs'>
          <CalendarHeatmap
            startDate={startDate}
            endDate={endDate}
            values={values}
            classForValue={(value) => {
              if (!value) {
                return 'fill-zinc-800';
              }
              return `fill-primary`;
            }}
          />
        </div>
      </CardBody>
    </Card>
  );
}
