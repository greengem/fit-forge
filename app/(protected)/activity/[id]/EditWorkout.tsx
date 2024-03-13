"use client";
import { useRouter } from "next/navigation";
import { TrackingType } from "@prisma/client";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";
import "./_components/DayPicker.css";
import { toast } from "sonner";

import { Input } from "@nextui-org/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Card, CardBody, CardHeader, CardFooter } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";

import {
  IconCalendar,
  IconDeviceFloppy,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import { handleUpdateWorkout } from "@/server-actions/WorkoutServerActions";
import ExerciseOrderIndicator from "@/components/Generic/ExerciseOrderIndicator";

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
  trackingType: TrackingType;
};

type Workout = {
  id: string;
  duration: number;
  date: Date;
  WorkoutPlan: {
    name: string;
    id: string;
  };
  exercises: Exercise[];
};

export default function EditWorkout({ workout }: { workout: Workout }) {
  const router = useRouter();

  const [minutes, setMinutes] = useState(
    Math.floor(workout.duration / 60).toString() || "0",
  );
  const [seconds, setSeconds] = useState(
    (workout.duration % 60).toString() || "0",
  );
  const [selectedDate, setSelectedDate] = useState<Date>(workout.date);
  const [exerciseSets, setExerciseSets] = useState(
    workout.exercises.map((exercise) => exercise.sets),
  );

  const handleSetChange = (
    exerciseIndex: number,
    setIndex: number,
    field: keyof ExerciseSet,
    value: number | null,
  ) => {
    const newExerciseSets = [...exerciseSets];
    newExerciseSets[exerciseIndex][setIndex][field] = value;
    setExerciseSets(newExerciseSets);
  };

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

  const handleAddSet = (exerciseIndex: number) => {
    const newExerciseSets = [...exerciseSets];
    newExerciseSets[exerciseIndex].push({
      weight: null,
      reps: null,
      exerciseDuration: null,
    });
    setExerciseSets(newExerciseSets);
  };

  const handleRemoveSet = (exerciseIndex: number) => {
    const newExerciseSets = [...exerciseSets];
    if (newExerciseSets[exerciseIndex].length > 1) {
      newExerciseSets[exerciseIndex].pop();
      setExerciseSets(newExerciseSets);
    } else {
      toast.error("Cannot remove all sets");
    }
  };

  const validateForm = (): boolean => {
    if ((!minutes && !seconds) || !selectedDate) {
      toast.error("Please fill in all fields");
      return false;
    }

    for (let i = 0; i < exerciseSets.length; i++) {
      for (let j = 0; j < exerciseSets[i].length; j++) {
        const set = exerciseSets[i][j];
        if (
          set.weight === null ||
          (workout.exercises[i].trackingType === "reps"
            ? set.reps === null
            : set.exerciseDuration === null)
        ) {
          toast.error(
            `Please fill in all fields for Exercise ${i + 1}, Set ${j + 1}`,
          );
          return false;
        }
      }
    }

    return true;
  };

  const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = {
      workoutPlanId: workout.WorkoutPlan.id,
      duration: parseInt(minutes) * 60 + parseInt(seconds),
      date: selectedDate.toISOString(),
      exercises: workout.exercises.map((exercise, exerciseIndex) => ({
        ...exercise,
        sets: exerciseSets[exerciseIndex].map((set) => ({
          ...set,
          duration: set.exerciseDuration,
          completed: true,
        })),
      })),
    };

    const response = await handleUpdateWorkout(workout.id, formData);
    if (response.success) {
      toast.success(response.message);
      router.push("/activity");
    } else {
      toast.error(response.message);
    }
  };

  return (
    <form onSubmit={handleSave}>
      <Card shadow="none" className="mb-3 shadow-md">
        <CardHeader className="text-lg px-3">Date & Duration</CardHeader>
        <CardBody className="grid grid-cols-3 gap-3 px-3 pt-0">
          <Input
            type="number"
            size="sm"
            label="Duration (Mins)"
            value={minutes}
            onChange={handleMinutesChange}
          />
          <Input
            type="number"
            size="sm"
            label="Duration (Seconds)"
            value={seconds}
            onChange={handleSecondsChange}
          />
          <Input
            label="Date"
            size="sm"
            readOnly
            value={format(selectedDate, "dd-MM-yyyy")}
            endContent={
              <Popover placement="left">
                <PopoverTrigger>
                  <IconCalendar className="cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    defaultMonth={selectedDate}
                    showOutsideDays
                    fixedWeeks
                  />
                </PopoverContent>
              </Popover>
            }
          />
        </CardBody>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3 mb-3">
        {workout.exercises.map((exercise, exerciseIndex) => (
          <Card key={exerciseIndex} shadow="none" className="shadow-md">
            <CardHeader className="text-lg px-3">
              <div className="flex gap-2 items-center mb-3">
                <ExerciseOrderIndicator position={exerciseIndex} />
                <p className="text-lg">{exercise.Exercise.name}</p>
              </div>
            </CardHeader>
            <CardBody className="pt-0 px-3">
              <Table
                aria-label="Example static collection table"
                removeWrapper
                shadow="none"
              >
                <TableHeader>
                  <TableColumn>SET</TableColumn>
                  <TableColumn>WEIGHT</TableColumn>
                  <TableColumn>
                    {exercise.trackingType.toUpperCase()}
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {exercise.sets.map((set, setIndex) => (
                    <TableRow key={setIndex}>
                      <TableCell>{setIndex + 1}</TableCell>
                      <TableCell>
                        <Input
                          label="Weight"
                          type="number"
                          placeholder="0"
                          size="sm"
                          defaultValue={set.weight ? set.weight.toString() : ""}
                          onChange={(e) =>
                            handleSetChange(
                              exerciseIndex,
                              setIndex,
                              "weight",
                              parseFloat(e.target.value),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {exercise.trackingType === "reps" ? (
                          <Input
                            label="Reps"
                            placeholder="0"
                            type="number"
                            size="sm"
                            defaultValue={set.reps ? set.reps.toString() : ""}
                            onChange={(e) =>
                              handleSetChange(
                                exerciseIndex,
                                setIndex,
                                "reps",
                                parseFloat(e.target.value),
                              )
                            }
                          />
                        ) : (
                          <Input
                            label="Duration"
                            type="number"
                            placeholder="0"
                            size="sm"
                            defaultValue={
                              set.exerciseDuration
                                ? set.exerciseDuration.toString()
                                : ""
                            }
                            onChange={(e) =>
                              handleSetChange(
                                exerciseIndex,
                                setIndex,
                                "exerciseDuration",
                                parseFloat(e.target.value),
                              )
                            }
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter className="gap-2 px-5 bg-default-100">
              <ButtonGroup>
                <Button
                  className="gap-unit-1"
                  size="sm"
                  onClick={() => handleAddSet(exerciseIndex)}
                >
                  <IconPlus size={16} />
                  Add Set
                </Button>
                <Button
                  className="gap-unit-1"
                  size="sm"
                  onClick={() => handleRemoveSet(exerciseIndex)}
                >
                  <IconX size={16} />
                  Remove Set
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Button color="primary" type="submit">
          <IconDeviceFloppy /> Save
        </Button>
        <Button as={Link} href="/activity" color="danger">
          <IconX /> Cancel
        </Button>
      </div>
    </form>
  );
}
