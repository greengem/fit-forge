"use client";
import { ChangeEvent } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { RadioGroup, Radio } from "@nextui-org/radio";
import { Button, ButtonGroup } from "@nextui-org/button";
import { IconArrowUp, IconArrowDown, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { WorkoutPlanExercise } from "../NewRoutineTypes";
import ExerciseOrderIndicator from "@/components/Generic/ExerciseOrderIndicator";

type RoutineExerciseCardProps = {
  exercise: any;
  index: number;
  totalExercises: number;
  updateExercise: (
    index: number,
    field: keyof WorkoutPlanExercise,
    value: string | number | null,
  ) => void;
  moveUp: (index: number) => void;
  moveDown: (index: number) => void;
  deleteExercise: (index: number) => void;
};

export default function RoutineExerciseCard({
  exercise,
  index,
  totalExercises,
  updateExercise,
  moveUp,
  moveDown,
  deleteExercise,
}: RoutineExerciseCardProps) {
  const router = useRouter();

  const updateTrackingType = (index: number, type: "reps" | "duration") => {
    updateExercise(index, "trackingType", type);
  };

  return (
    <Card key={index} shadow="none" className="touch-none shadow-md">
      <CardBody className="p-3">
        <div className="flex gap-2 items-center mb-3">
          <ExerciseOrderIndicator position={index} />
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

        <div className="flex justify-between">
          <ButtonGroup size="sm">
            <Button
              aria-label="Move up"
              isIconOnly
              onPress={() => moveUp(index)}
              isDisabled={index === 0}
            >
              <IconArrowUp size={18} />
            </Button>
            <Button
              aria-label="Move down"
              isIconOnly
              onPress={() => moveDown(index)}
              isDisabled={index === totalExercises - 1}
            >
              <IconArrowDown size={18} />
            </Button>
          </ButtonGroup>
          <Button
            aria-label="Delete exercise"
            color="danger"
            isIconOnly
            size="sm"
            onPress={() => deleteExercise(index)}
          >
            <IconTrash size={18} />
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}
