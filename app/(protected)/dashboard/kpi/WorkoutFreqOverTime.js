"use client";
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title } from 'chart.js';
import { CardHeader, CardBody, CardFooter } from '@nextui-org/card';
import {CheckboxGroup, Checkbox} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import NextImage from "next/image";

Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Title);

export default function KPIWorkoutFreqOverTime() {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Strength',
        data: [5, 8, 4, 6, 7],
        borderColor: '#0070F0',
        fill: false,
      },
      {
        label: 'Cardio',
        data: [8, 6, 7, 5, 8],
        borderColor: '#F31260',
        fill: false,
      },
      {
        label: 'Flexibility',
        data: [3, 4, 5, 4, 6],
        borderColor: '#F5A524',
        fill: false,
      },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <div>
    <CardHeader className="flex gap-3 bg-gray-800">
      <Image
        as={NextImage}
        alt="nextui logo"
        height={40}
        radius="sm"
        src="/icons/tabler-icon-chart-line.svg"
        width={40}
      />
      <div className="flex flex-col">
        <p className="text-md">Training Frequency Trends</p>
        <p className="text-small text-default-500">Trends in Training Sessions</p>
      </div>
    </CardHeader>
    <CardBody className='p-3'>
        <Line data={data} options={options} />
    </CardBody>
    <CardFooter>
        <CheckboxGroup
          size='sm'
          orientation="horizontal"
          color="secondary"
          defaultValue={["strength", "cardio", "flexibility"]}
        >
          <Checkbox color='primary' value="strength">Strength</Checkbox>
          <Checkbox color='danger' value="cardio">Cardio</Checkbox>
          <Checkbox color='warning' value="flexibility">Flexibility</Checkbox>
        </CheckboxGroup>
      </CardFooter>
    </div>
  );
}
