'use client'
import { useState } from "react";
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import FormatDuration from "@/utils/FormatDuration";
import { Input } from "@nextui-org/react";
import {  Table,  TableHeader,  TableBody,  TableColumn,  TableRow,  TableCell} from "@nextui-org/table";
import PageHeading from "@/components/PageHeading/PageHeading";

type ExerciseSet = {
    weight: number | null;
    reps: number | null;
    exerciseDuration: number | null;
};

type Exercise = {
    id: string;
    exerciseId: string;
    Exercise: {
        name: string;
    };
    sets: ExerciseSet[];
};

type Workout = {
    id: string;
    duration: number;
    date: Date;
    WorkoutPlan: {
        name: string;
    };
    exercises: Exercise[];
};

export default function EditWorkout({ workout } : { workout: Workout }) {
    console.log(workout);

    const [minutes, setMinutes] = useState(Math.floor(workout.duration / 60).toString() || "0");
    const [seconds, setSeconds] = useState((workout.duration % 60).toString() || "0");

    const [selectedDate, setSelectedDate] = useState<Date>(workout.date);

    const handleMinutesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newMinutes = parseInt(event.target.value);
        setMinutes(newMinutes.toString());
        workout.duration = newMinutes * 60 + parseInt(seconds);
    };
    
    const handleSecondsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSeconds = parseInt(event.target.value);
        setSeconds(newSeconds.toString());
        workout.duration = parseInt(minutes) * 60 + newSeconds;
    };

    const handleDateChange = (newDate: Date | undefined) => {
        if (newDate) {
            setSelectedDate(newDate);
        }
    };

    let footer = <p>Please pick a day.</p>;
    if (selectedDate) {
        footer = <p>You picked {format(selectedDate, 'PP')}.</p>;
    }

    return (
        <>
            <PageHeading title="Edit Workout" />

            <div className="flex gap-3">
                <Input
                    label="Duration (Mins)"
                    value={minutes}
                    onChange={handleMinutesChange}
                />
                <Input
                    label="Duration (Seconds)"
                    value={seconds}
                    onChange={handleSecondsChange}
                />
            </div>
            <p>Date: {new Date(workout.date).toLocaleString()}</p>

            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleDateChange}
                footer={footer}
                defaultMonth={selectedDate}
                showOutsideDays
                fixedWeeks
            />


            {workout.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex}>
                    <h2>{exercise.Exercise.name}</h2>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>SET</TableColumn>
                            <TableColumn>WEIGHT</TableColumn>
                            <TableColumn>REPS</TableColumn>
                            <TableColumn>DURATION</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {exercise.sets.map((set, setIndex) => (
                                <TableRow key={setIndex}>
                                    <TableCell>{setIndex + 1}</TableCell>
                                    <TableCell>{set.weight}kg</TableCell>
                                    <TableCell>{set.reps}</TableCell>
                                    <TableCell>{set.exerciseDuration ? <FormatDuration seconds={set.exerciseDuration} /> : 'N/A'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ))}
        </>
    )
}