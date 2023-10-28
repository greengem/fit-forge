"use client";
import React, { useEffect, useState } from 'react';
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
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";

// Register ChartJS plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },
};

const generateDummyData = () => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August'
    ];

    const averageWorkoutDurationData = [30, 50, 45, 60, 50, 75, 65, 95]; // Static data

    const dummyData = months.map((month, index) => {
        return {
            month,
            averageWorkoutDuration: averageWorkoutDurationData[index],
        };
    });

    return dummyData;
};

const DashboardChartWorkout = () => {
    const [chartData, setChartData] = useState(null);
    const [visibility, setVisibility] = useState(true);

    // Load the chart data
    useEffect(() => {
        const dummyData = generateDummyData();

        const labels = dummyData.map((data) => data.month);
        const dataset1Data = dummyData.map((data) => data.averageWorkoutDuration);

        setChartData({
            labels,
            datasets: [
                {
                    label: 'Average Workout Duration (mins)',
                    data: dataset1Data,
                    borderColor: '#a6ff00',
                    backgroundColor: 'rgba(166, 255, 0, 0.5)',
                    hidden: !visibility,
                },
            ],
        });

    }, [visibility]);

    const handleCheckboxChange = () => {
        setVisibility(!visibility);
    };

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <Card shadow="none" className="shadow-md">
            <CardBody className='h-64 pb-2'>
                <Line options={options} data={chartData} className='max-w-full' />
            </CardBody>
            <CardFooter className='pt-0'>
            <CheckboxGroup 
                    orientation="horizontal"
                    defaultValue={["exercises", "workouts"]}
                >
                    <Checkbox 
                        color='success' 
                        value="exercises"
                        checked={visibility.exercises}
                        onChange={() => handleCheckboxChange('exercises')}
                    >
                        Average Duration
                    </Checkbox>
                </CheckboxGroup>
            </CardFooter>
        </Card>
    );
};

export default DashboardChartWorkout;
