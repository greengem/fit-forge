"use client";
import { Workout } from "./WorkoutTypes";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleSaveWorkoutV2 } from "@/server-actions/WorkoutServerActions";

import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell,} from "@nextui-org/table";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IconCheck, IconPlus, IconSquareCheck, IconX } from "@tabler/icons-react";
import { Switch } from "@nextui-org/react";


export default function WorkoutManagerV2({ workout }: { workout: Workout }) {
  const router = useRouter();

  const [weightValues, setWeightValues] = useState<Record<string, string>>({});
  const [trackingValues, setTrackingValues] = useState<Record<string, string>>({});
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const weightRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const trackingRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const duration = 60;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue && !isNaN(Number(newValue))) {
      const name = e.target.name;
      if (name.includes('weight')) {
        setWeightValues(prevValues => ({ ...prevValues, [name]: newValue }));
      } else {
        setTrackingValues(prevValues => ({ ...prevValues, [name]: newValue }));
      }
    }
  };

  const handleCompleteSet = (setIndex: number, exerciseId: string, trackingType: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked;
    setCompletedSets(prevState => ({ ...prevState, [`${exerciseId}-${setIndex}`]: newValue }));
  
    if (newValue) {
      const weightInput = weightRefs.current[`${exerciseId}-${setIndex}`];
      const trackingInput = trackingRefs.current[`${exerciseId}-${setIndex}`];
    
      if (weightInput && trackingInput) {
        setFormData(prevState => ({
          ...prevState,
          [`exercises.${exerciseId}.sets.${setIndex}.weight`]: weightInput.value,
          [`exercises.${exerciseId}.sets.${setIndex}.${trackingType === 'duration' ? 'exerciseDuration' : trackingType}`]: trackingInput.value
        }));
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);
  
    const structuredData: Record<string, { sets: Array<{ weight: string, reps: string, exerciseDuration: string }> }> = {};
  
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
          structuredData[exerciseId].sets[setIndex] = { weight: '', reps: '', exerciseDuration: '' };
        }
  
        structuredData[exerciseId].sets[setIndex][property as 'weight' | 'reps' | 'exerciseDuration'] = formData[key];
      });
  
    const dataToSend = {
      duration,
      workoutPlanId: workout.id,
      exercises: structuredData,
    };

    const response = await handleSaveWorkoutV2(dataToSend);
    if (response.success) {
      router.push("/dashboard");
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsSubmitting(false);

  };

  return (
    <div>
      {workout.notes && (
        <p color="primary" className="mb-3">
          Notes: {workout.notes}
        </p>
      )}
      <Card className="mb-3" shadow="none"><CardBody>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
      </CardBody></Card>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mb-5">
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
                  <TableColumn>{exercise.trackingType === 'reps' ? 'REPS' : 'DURATION'}</TableColumn>
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
                          ref={(el) => weightRefs.current[`${exercise.Exercise.id}-${setIndex}`] = el}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          label={exercise.trackingType === 'reps' ? 'Reps' : 'Duration'}
                          placeholder={exercise.trackingType === 'reps' ? '8' : '60'}
                          size="sm"
                          isDisabled={completedSets[`${exercise.Exercise.id}-${setIndex}`]}
                          name={`exercises.${exercise.Exercise.id}.sets.${setIndex}.${exercise.trackingType}`}
                          ref={(el) => trackingRefs.current[`${exercise.Exercise.id}-${setIndex}`] = el}
                          onChange={handleInputChange}
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          startContent={<IconCheck />}
                          endContent={<IconX />}
                          onChange={handleCompleteSet(setIndex, exercise.Exercise.id, exercise.trackingType)}
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
        <Button isLoading={isSubmitting} type="submit">Submit</Button>
      </form>
    </div>
  );
}
