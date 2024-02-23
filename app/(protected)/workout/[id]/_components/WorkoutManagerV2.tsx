"use client";
import { useState } from "react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell,} from "@nextui-org/table";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IconCheck, IconPlus, IconSquareCheck, IconX } from "@tabler/icons-react";
import { Switch } from "@nextui-org/react";
import { Workout } from "./WorkoutTypes";

export default function WorkoutManagerV2({ workout }: { workout: Workout }) {
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});

  const handleCompleteSet = (setIndex: number, exerciseId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setCompletedSets(prevState => ({ ...prevState, [`${exerciseId}-${setIndex}`]: newValue }));
  };

  return (
    <div>
      {workout.notes && (
        <p color="primary" className="mb-3">
          Notes: {workout.notes}
        </p>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
        {workout.WorkoutPlanExercise.map((exercise, index) => (
          <Card
            key={exercise.Exercise.id}
            shadow="none"
            className="shadow-md"
            radius="md"
          >
            <CardHeader className="text-lg px-5">
              {index + 1}. {exercise.Exercise.name}
            </CardHeader>
            <CardBody className="pb-1 pt-0">
              <Table removeWrapper aria-label="Table">
                <TableHeader>
                  <TableColumn>SET</TableColumn>
                  <TableColumn>KG</TableColumn>
                  <TableColumn>REPS</TableColumn>
                  <TableColumn className="flex justify-center items-center">
                    <IconSquareCheck />
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                    <TableRow key={setIndex}>
                      <TableCell>{setIndex + 1}</TableCell>
                      <TableCell>
                        <Input
                          label="Weight"
                          placeholder="20"
                          size="sm"
                          endContent={
                            <div className="pointer-events-none flex items-center">
                              <span className="text-default-400 text-small">
                                kg
                              </span>
                            </div>
                          }
                          isDisabled={completedSets[`${exercise.Exercise.id}-${setIndex}`]}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          label="Reps"
                          placeholder="8"
                          size="sm"
                          defaultValue={
                            exercise.reps ? exercise.reps.toString() : ""
                          }
                          isDisabled={completedSets[`${exercise.Exercise.id}-${setIndex}`]}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          startContent={<IconCheck />}
                          endContent={<IconX />}
                          onChange={handleCompleteSet(setIndex, exercise.Exercise.id)}
                          size="lg"
                          name="completedSwitch"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
            <CardFooter className="gap-2 px-5 bg-zinc-800">
              <ButtonGroup>
                <Button className="gap-unit-1" size="sm">
                  <IconPlus size={16} />
                  Add Set
                </Button>
                <Button className="gap-unit-1" size="sm">
                  <IconX size={16} />
                  Remove Set
                </Button>
              </ButtonGroup>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
