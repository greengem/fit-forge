'use client'
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Button } from "@nextui-org/button";
import { User } from "@nextui-org/user";
import { IconPlus } from "@tabler/icons-react";
import { SearchResult } from "../NewRoutineTypes";

type SearchResultsProps = {
  searchResults: SearchResult[];
  addExerciseToRoutine: (exercise: SearchResult) => void;
};

export default function SearchResults({
  searchResults,
  addExerciseToRoutine,
}: SearchResultsProps) {
  return (
    <Table
    aria-label="Exercises Table"
    className="mb-3 shadow-md"
    shadow="none"
    classNames={{ wrapper: "p-2 md:p-4" }}
  >
    <TableHeader>
      <TableColumn>NAME</TableColumn>
      <TableColumn><></></TableColumn>
    </TableHeader>
    <TableBody emptyContent={"No results found."}>
      {searchResults.map((exercise) => (
        <TableRow key={exercise.id}>
          <TableCell className="capitalize py-1 pl-1">
            <User
              avatarProps={{
                radius: "lg",
                src: `/images/exercises/${exercise.image}/images/0.jpg`,
              }}
              description={
                <span className="text-zinc-500">{exercise.category}</span>
              }
              name={exercise.name}
            />
          </TableCell>
          <TableCell className="flex justify-end py-1 pr-1">
              <Button
                isIconOnly
                size="sm"
                variant="flat"
                color="success"
                onPress={() => addExerciseToRoutine(exercise)}
              >
                <IconPlus size={20} />
              </Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
  );
}
