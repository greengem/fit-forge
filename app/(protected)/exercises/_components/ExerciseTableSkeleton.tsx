"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export default function ExerciseTableSkeleton() {
  return (
    <Table aria-label="Example empty table">
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn className="hidden lg:table-cell">MUSCLES</TableColumn>
        <TableColumn className="hidden lg:table-cell">CATEGORY</TableColumn>
        <TableColumn>
          <></>
        </TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Loading..."}>{[]}</TableBody>
    </Table>
  );
}
