"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Input } from "@nextui-org/input";
import { IconSquareCheck } from "@tabler/icons-react";
import { Checkbox } from "@nextui-org/checkbox";

interface Set {
  weight: number | "" | null;
  duration?: number | "" | null;
  reps?: number | "" | null;
  completed: boolean;
}

interface ExerciseDetail {
  exerciseName: string;
  sets: Set[];
  trackingType: string;
}

interface ExerciseTableProps {
  exerciseDetail: ExerciseDetail;
  index: number;
  handleCompleteSet: (
    exerciseIndex: number,
    setIndex: number,
    exerciseName: string,
    isSelected: boolean,
  ) => void;
  handleWeightChange: (
    exerciseIndex: number,
    setIndex: number,
    newValue: number,
  ) => void;
  handleRepChange: (
    exerciseIndex: number,
    setIndex: number,
    newValue: number | null,
  ) => void;
  handleDurationChange: (
    exerciseIndex: number,
    setIndex: number,
    newValue: number | null,
  ) => void;
}

export default function ExerciseTable({
  exerciseDetail,
  index,
  handleCompleteSet,
  handleWeightChange,
  handleRepChange,
  handleDurationChange,
}: ExerciseTableProps) {
  return (
    <Table
      removeWrapper
      aria-label={`Table for exercise ${exerciseDetail.exerciseName}`}
      className="min-w-full table-auto"
      shadow="none"
    >
      <TableHeader>
        <TableColumn>SET</TableColumn>
        <TableColumn>KG</TableColumn>
        {exerciseDetail.trackingType === "duration" ? (
          <TableColumn>DURATION</TableColumn>
        ) : (
          <TableColumn>REPS</TableColumn>
        )}
        <TableColumn className="flex justify-center items-center">
          <IconSquareCheck />
        </TableColumn>
      </TableHeader>
      <TableBody>
        {exerciseDetail.sets.map((set, setIndex) => (
          <TableRow key={setIndex}>
            <TableCell>{setIndex + 1}</TableCell>
            <TableCell>
              <Input
                size="sm"
                type="number"
                label="Weight"
                placeholder="0"
                defaultValue={set.weight !== null ? String(set.weight) : ""}
                endContent={<span className="text-zinc-600 dark:text-zinc-400">kg</span>}
                onInput={(e) => {
                  const value = e.currentTarget.value;
                  if (!/^(\d*\.?\d{0,2}|\.\d{0,2})$/.test(value)) {
                    e.currentTarget.value = value.slice(0, -1);
                  }
                }}
                onChange={(e) =>
                  handleWeightChange(index, setIndex, Number(e.target.value))
                }
                isDisabled={set.completed}
              />
            </TableCell>
            {exerciseDetail.trackingType === "duration" ? (
              <TableCell>
                <Input
                  size="sm"
                  type="number"
                  label="Duration"
                  defaultValue={
                    set.duration !== null ? String(set.duration) : ""
                  }
                  placeholder="0"
                  endContent={<span className="text-zinc-600 dark:text-zinc-400">s</span>}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    if (!/^\d*$/.test(value)) {
                      e.currentTarget.value = value.slice(0, -1);
                    }
                  }}
                  onChange={(e) =>
                    handleDurationChange(
                      index,
                      setIndex,
                      Number(e.currentTarget.value),
                    )
                  }
                  isDisabled={set.completed}
                />
              </TableCell>
            ) : (
              <TableCell>
                <Input
                  size="sm"
                  label="Reps"
                  type="number"
                  placeholder="0"
                  defaultValue={set.reps !== null ? String(set.reps) : ""}
                  onInput={(e) => {
                    const value = e.currentTarget.value;
                    if (!/^\d*$/.test(value)) {
                      e.currentTarget.value = value.slice(0, -1);
                    }
                  }}
                  onChange={(e) =>
                    handleRepChange(
                      index,
                      setIndex,
                      Number(e.currentTarget.value),
                    )
                  }
                  isDisabled={set.completed}
                />
              </TableCell>
            )}

            <TableCell className="text-center">
              <Checkbox
                size="lg"
                color={set.completed ? "primary" : "danger"}
                isSelected={set.completed}
                aria-label="Complete Set"
                onValueChange={(isSelected) =>
                  handleCompleteSet(
                    index,
                    setIndex,
                    exerciseDetail.exerciseName,
                    isSelected,
                  )
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
