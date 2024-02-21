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
  weight: number | "";
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
                labelPlacement="outside"
                type="number"
                value={String(set.weight) || ""}
                onChange={(e) =>
                  handleWeightChange(index, setIndex, Number(e.target.value))
                }
                isDisabled={set.completed}
                className="max-w-[80px]"
              />
            </TableCell>
            {exerciseDetail.trackingType === "duration" ? (
              <TableCell>
                <Input
                  labelPlacement="outside"
                  type="number"
                  value={set.duration !== null ? String(set.duration) : ""}
                  onChange={(e) =>
                    handleDurationChange(
                      index,
                      setIndex,
                      Number(e.target.value),
                    )
                  }
                  isDisabled={set.completed}
                  className="max-w-[80px]"
                />
              </TableCell>
            ) : (
              <TableCell>
                <Input
                  labelPlacement="outside"
                  type="number"
                  value={set.reps !== null ? String(set.reps) : ""}
                  onChange={(e) =>
                    handleRepChange(index, setIndex, Number(e.target.value))
                  }
                  isDisabled={set.completed}
                  className="max-w-[80px]"
                />
              </TableCell>
            )}

            <TableCell className="text-center">
              <Button
                isIconOnly
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
                  <IconSquareCheck size={20} />
                ) : (
                  <IconSquare size={20} />
                )}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
