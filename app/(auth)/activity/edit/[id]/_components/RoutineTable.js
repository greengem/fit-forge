"use client";
import { Input } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell} from "@nextui-org/table";

export default function RoutineTable({ exercise }) {
  return (
    <Table removeWrapper aria-label="Example static collection table" shadow="none">
      <TableHeader>
        <TableColumn>SET</TableColumn>
        <TableColumn>KG</TableColumn>
        <TableColumn>REPS</TableColumn>
        <TableColumn>DURATION</TableColumn>
      </TableHeader>
      <TableBody>
        {exercise.sets.map((set, index) => (
          <TableRow key={index}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{set.weight}</TableCell>
            <TableCell>{set.reps}</TableCell>
            <TableCell>{set.duration}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
