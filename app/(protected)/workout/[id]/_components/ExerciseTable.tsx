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
import { Button } from "@nextui-org/button";
import { IconSquare, IconSquareCheck } from "@tabler/icons-react";

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
                label="Weight"
                placeholder="0"
                value={set.weight !== null && set.weight !== undefined ? String(set.weight) : ""}
                endContent={
                  <span className="text-zinc-500">kg</span>
                }
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
                  label="Duration"
                  placeholder={set.duration !== null ? String(set.duration) : ""}
                  endContent={
                    <span className="text-zinc-500">s</span>
                  }
                  onChange={(e) =>
                    handleDurationChange(
                      index,
                      setIndex,
                      Number(e.target.value),
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
                  placeholder={set.reps !== null ? String(set.reps) : ""}
                  onChange={(e) =>
                    handleRepChange(index, setIndex, Number(e.target.value))
                  }
                  isDisabled={set.completed}
                />
              </TableCell>
            )}

            <TableCell className="text-center">
              <Button
                isIconOnly
                radius="sm"
                size="lg"
                color={set.completed ? "primary" : "danger"}
                onPress={() =>
                  handleCompleteSet(
                    index,
                    setIndex,
                    exerciseDetail.exerciseName,
                  )
                }
              >
                {set.completed ? (
                  <IconSquareCheck />
                ) : (
                  <IconSquare />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
