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

const DashboardChartWorkout = ({ workouts }) => {
    const [chartData, setChartData] = useState(null);
    const [visibility, setVisibility] = useState({ exercises: true, workouts: true });

    // Load the chart data
    useEffect(() => {
        const monthCounterExercises = {};
        const monthCounterWorkouts = {};

        workouts.forEach((workout) => {
            const date = new Date(workout.createdAt);
            const month = date.toLocaleString('default', { month: 'long' });

            if (!monthCounterExercises[month]) {
                monthCounterExercises[month] = 0;
            }
            if (!monthCounterWorkouts[month]) {
                monthCounterWorkouts[month] = 0;
            }

            monthCounterExercises[month] += workout.exercises.length;
            monthCounterWorkouts[month]++;
        });

        const labels = Object.keys(monthCounterExercises);
        const dataset1Data = Object.values(monthCounterExercises);
        const dataset2Data = Object.values(monthCounterWorkouts);


        setChartData({
            labels,
            datasets: [
                {
                    label: 'Exercises Completed',
                    data: dataset1Data,
                    borderColor: '#a6ff00',
                    backgroundColor: 'rgba(166, 255, 0, 0.5)',
                    hidden: !visibility.exercises
                },
                {
                    label: 'Workouts Completed',
                    data: dataset2Data,
                    borderColor: '#f9266b',
                    backgroundColor: 'rgba(249, 38, 107, 0.5)',
                    hidden: !visibility.workouts
                },
            ],
        });

    }, [workouts, visibility]);

    const handleCheckboxChange = (value) => {
        setVisibility({
            ...visibility,
            [value]: !visibility[value]
        });
    };

    if (!chartData) {
        return <div>Loading...</div>;
    }

    return (
        <Card>
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
                        Exercises
                    </Checkbox>
                    <Checkbox 
                        color='danger' 
                        value="workouts"
                        checked={visibility.workouts}
                        onChange={() => handleCheckboxChange('workouts')}
                    >
                        Workouts
                    </Checkbox>
                </CheckboxGroup>
            </CardFooter>
        </Card>
    );
};

export default DashboardChartWorkout;
