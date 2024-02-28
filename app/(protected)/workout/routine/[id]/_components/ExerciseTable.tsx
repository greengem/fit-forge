"use client";
import { ChangeEvent } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  IconArrowUp,
  IconArrowDown,
  IconTrash,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { WorkoutPlanExercise } from "../NewRoutineTypes";

type ExerciseTableProps = {
  selectedExercises: WorkoutPlanExercise[];
  updateExercise: (
    index: number,
    field: keyof WorkoutPlanExercise,
    value: string | number | null,
  ) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  deleteExercise: (index: number) => void;
};

export default function ExerciseTable({
  selectedExercises,
  updateExercise,
  moveUp,
  moveDown,
  deleteExercise,
}: ExerciseTableProps) {
  const router = useRouter();

  const updateTrackingType = (index: number, type: "reps" | "duration") => {
    updateExercise(index, "trackingType", type);
  };

  return (
    <div className="space-y-3">
      {selectedExercises.map((exercise, index) => (
        <Card key={index} shadow="none" className="shadow-md">
          <CardBody className="p-3">
            <div className="flex gap-2 items-center mb-3">
              <span className="bg-zinc-800 text-primary rounded-full text-sm flex justify-center items-center h-8 w-8">{index + 1}</span>
              <p className="text-lg">{exercise.Exercise.name}</p>
            </div>

            <RadioGroup
              key={`radio-${exercise.Exercise.id}`}
              orientation="horizontal"
              color="primary"
              className="mb-3"
              size="sm"
              value={exercise.trackingType}
              onValueChange={(value) => {
                updateTrackingType(index, value as "reps" | "duration");
              }}
            >
              <Radio value="reps">Reps</Radio>
              <Radio value="duration">Duration (seconds)</Radio>
            </RadioGroup>

            <div className="grid grid-cols-2 gap-x-5 mb-3">
              <Input
                size="sm"
                type="number"
                label="Sets"
                value={exercise.sets !== null ? exercise.sets.toString() : ""}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const value = e.target.value;
                  const intValue = parseInt(value, 10);
                  if (!isNaN(intValue)) {
                    updateExercise(index, "sets", intValue);
                  } else if (value === "") {
                    updateExercise(index, "sets", null);
                  }
                }}
              />

              {exercise.trackingType === "reps" ? (
                <Input
                  size="sm"
                  label="Reps"
                  type="number"
                  value={exercise.reps !== null ? exercise.reps.toString() : ""}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const intValue = parseInt(value, 10);
                    if (!isNaN(intValue)) {
                      updateExercise(index, "reps", intValue);
                    } else if (value === "") {
                      updateExercise(index, "reps", null);
                    }
                  }}
                />
              ) : (
                <Input
                  size="sm"
                  label="Duration"
                  type="number"
                  value={
                    exercise.exerciseDuration !== null
                      ? exercise.exerciseDuration.toString()
                      : ""
                  }
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value;
                    const intValue = parseInt(value, 10);
                    if (!isNaN(intValue)) {
                      updateExercise(index, "exerciseDuration", intValue);
                    } else if (value === "") {
                      updateExercise(index, "exerciseDuration", null);
                    }
                  }}
                />
              )}
            </div>

            <ButtonGroup className="justify-start" size="sm">
              <Button isIconOnly onPress={() => moveUp(index)}>
                <IconArrowUp size={18} />
              </Button>
              <Button isIconOnly onPress={() => moveDown(index)}>
                <IconArrowDown size={18} />
              </Button>
              <Button
                color="danger"
                isIconOnly
                onPress={() => deleteExercise(index)}
              >
                <IconTrash size={18} />
              </Button>
            </ButtonGroup>
          </CardBody>
        </Card>
      ))}
    </div>
  );
}
