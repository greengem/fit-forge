"use client";
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
import { Card, CardBody, CardHeader } from "@nextui-org/card";

// Dummy data
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const dataset1Data = [100, 200, 150, 250, 180, 300, 220];

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false,
        },
        title: {
            display: false,
            text: 'Chart.js Line Chart',
        },
    },
};

const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: dataset1Data,
        borderColor: '#a6ff00',
        backgroundColor: 'rgba(166, 255, 0, 0.5)',
    },
    
    ],
};

export default function DashboardChart() {
    return (
        <Card>
            <CardHeader className='px-5'>Chart</CardHeader>
            <CardBody>
                <Line options={options} data={data} />
            </CardBody>
        </Card>
    );
}
