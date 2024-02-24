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
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleCompleteSet = (setIndex: number, exerciseId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setCompletedSets(prevState => ({ ...prevState, [`${exerciseId}-${setIndex}`]: newValue }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const structuredData: Record<string, { sets: Array<{ weight: string, reps: string }> }> = {};
  
    Object.keys(formData)
      .filter(key => {
        const nameParts = key.split('.');
        const exerciseId = nameParts[1];
        const setIndex = nameParts[3];
        return completedSets[`${exerciseId}-${setIndex}`];
      })
      .forEach(key => {
        const nameParts = key.split('.');
        const exerciseId = nameParts[1];
        const setIndex = parseInt(nameParts[3]);
        const property = nameParts[4];
  
        if (!structuredData[exerciseId]) {
          structuredData[exerciseId] = { sets: [] };
        }
  
        if (!structuredData[exerciseId].sets[setIndex]) {
          structuredData[exerciseId].sets[setIndex] = { weight: '', reps: '' };
        }
  
        structuredData[exerciseId].sets[setIndex][property as 'weight' | 'reps'] = formData[key];
      });
  
    console.log(structuredData);
  };

  return (
    <div>
      {workout.notes && (
        <p color="primary" className="mb-3">
          Notes: {workout.notes}
        </p>
      )}

      <form className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5" onSubmit={handleSubmit}>
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
                          name={`exercises.${exercise.Exercise.id}.sets.${setIndex}.weight`}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          label="Reps"
                          placeholder="8"
                          size="sm"
                          isDisabled={completedSets[`${exercise.Exercise.id}-${setIndex}`]}
                          name={`exercises.${exercise.Exercise.id}.sets.${setIndex}.reps`}
                          onChange={handleInputChange}
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
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
