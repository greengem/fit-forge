"use client";
import { Workout } from "./WorkoutTypes";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Button, ButtonGroup } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import {
  IconDeviceFloppy,
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerStopFilled,
  IconPlus,
  IconSquareCheck,
  IconX,
} from "@tabler/icons-react";

export default function WorkoutManagerV2({ workout }: { workout: Workout }) {
  const router = useRouter();

  const [setsCount, setSetsCount] = useState<Record<string, number>>(
    workout.WorkoutPlanExercise.reduce(
      (acc: Record<string, number>, exercise) => {
        acc[exercise.Exercise.id] = exercise.sets;
        return acc;
      },
      {},
    ),
  );
  const [completedSets, setCompletedSets] = useState<Record<string, boolean>>(
    {},
  );
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [checkboxDisabled, setCheckboxDisabled] = useState<
    Record<string, boolean>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const weightRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const trackingRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const duration = 60;

  const handleAddSet = (exerciseId: string) => {
    setSetsCount((prevState) => ({
      ...prevState,
      [exerciseId]: prevState[exerciseId] + 1,
    }));
  };

  const handleRemoveSet = (exerciseId: string) => {
    if (window.confirm("Are you sure you want to remove the last set?")) {
      setSetsCount((prevState) => {
        if (prevState[exerciseId] > 1) {
          return {
            ...prevState,
            [exerciseId]: prevState[exerciseId] - 1,
          };
        }
        return prevState;
      });
    }
  };

  const handleCompleteSet =
    (setIndex: number, exerciseId: string, trackingType: string) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.checked;
      setCompletedSets((prevState) => ({
        ...prevState,
        [`${exerciseId}-${setIndex}`]: newValue,
      }));

      const weightKey = `exercises.${exerciseId}.sets.${setIndex}.weight`;
      const trackingKey = `exercises.${exerciseId}.sets.${setIndex}.${trackingType === "duration" ? "exerciseDuration" : trackingType}`;

      if (newValue) {
        const weightInput = weightRefs.current[`${exerciseId}-${setIndex}`];
        const trackingInput = trackingRefs.current[`${exerciseId}-${setIndex}`];

        if (weightInput && trackingInput) {
          setFormData((prevState) => ({
            ...prevState,
            [weightKey]: weightInput.value,
            [trackingKey]: trackingInput.value,
          }));
        }
      } else {
        setFormData((prevState) => {
          const newState = { ...prevState };
          delete newState[weightKey];
          delete newState[trackingKey];
          return newState;
        });
      }
    };

  const handleInputChange = (setIndex: number, exerciseId: string) => {
    const weightInput = weightRefs.current[`${exerciseId}-${setIndex}`];
    const trackingInput = trackingRefs.current[`${exerciseId}-${setIndex}`];

    if (weightInput && trackingInput) {
      const weightValue = parseFloat(weightInput.value);
      const trackingValue = parseFloat(trackingInput.value);

      setCheckboxDisabled((prevState) => ({
        ...prevState,
        [`${exerciseId}-${setIndex}`]:
          isNaN(weightValue) || isNaN(trackingValue),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const structuredData: Record<
      string,
      {
        sets: Array<{ weight: string; reps: string; exerciseDuration: string }>;
      }
    > = {};

    Object.keys(formData)
      .filter((key) => {
        const nameParts = key.split(".");
        const exerciseId = nameParts[1];
        const setIndex = nameParts[3];
        return completedSets[`${exerciseId}-${setIndex}`];
      })
      .forEach((key) => {
        const nameParts = key.split(".");
        const exerciseId = nameParts[1];
        const setIndex = parseInt(nameParts[3]);
        const property = nameParts[4];

        if (!structuredData[exerciseId]) {
          structuredData[exerciseId] = { sets: [] };
        }

        if (!structuredData[exerciseId].sets[setIndex]) {
          structuredData[exerciseId].sets[setIndex] = {
            weight: "",
            reps: "",
            exerciseDuration: "",
          };
        }

        structuredData[exerciseId].sets[setIndex][
          property as "weight" | "reps" | "exerciseDuration"
        ] = formData[key];
      });

    const dataToSend = {
      duration,
      workoutPlanId: workout.id,
      exercises: structuredData,
    };

    //const response = await handleSaveWorkoutV2(dataToSend);
    const response = { success: true, message: "Workout saved successfully." }; // Placeholder response
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

      {/* <Card shadow="none" className="shadow-md mb-3"><CardBody>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">

            <Button color="primary">
              <IconPlayerPlayFilled />
              Start Workout
            </Button>

            <ButtonGroup variant="flat">
              <Button isIconOnly><IconPlayerPlayFilled className="text-primary" /></Button>
              <Button isIconOnly><IconPlayerPauseFilled className="text-warning" /></Button>
              <Button isIconOnly><IconDeviceFloppy className="text-danger" /></Button>
            </ButtonGroup>

          </div>
          <div>
            <p className="text-2xl">00:12:23</p>
          </div>
        </div>
      </CardBody></Card> */}

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
                    <TableColumn>
                      {exercise.trackingType === "reps" ? "REPS" : "DURATION"}
                    </TableColumn>
                    <TableColumn className="flex justify-center items-center">
                      <IconSquareCheck />
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {Array.from({
                      length: setsCount[exercise.Exercise.id],
                    }).map((_, setIndex) => (
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
                            isDisabled={
                              completedSets[
                                `${exercise.Exercise.id}-${setIndex}`
                              ]
                            }
                            name={`exercises.${exercise.Exercise.id}.sets.${setIndex}.weight`}
                            ref={(el) =>
                              (weightRefs.current[
                                `${exercise.Exercise.id}-${setIndex}`
                              ] = el)
                            }
                            onChange={() =>
                              handleInputChange(setIndex, exercise.Exercise.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            label={
                              exercise.trackingType === "reps"
                                ? "Reps"
                                : "Duration"
                            }
                            placeholder={
                              exercise.trackingType === "reps" ? "8" : "60"
                            }
                            size="sm"
                            isDisabled={
                              completedSets[
                                `${exercise.Exercise.id}-${setIndex}`
                              ]
                            }
                            name={`exercises.${exercise.Exercise.id}.sets.${setIndex}.${exercise.trackingType}`}
                            ref={(el) =>
                              (trackingRefs.current[
                                `${exercise.Exercise.id}-${setIndex}`
                              ] = el)
                            }
                            onChange={() =>
                              handleInputChange(setIndex, exercise.Exercise.id)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            size="lg"
                            onChange={handleCompleteSet(
                              setIndex,
                              exercise.Exercise.id,
                              exercise.trackingType,
                            )}
                            isDisabled={
                              checkboxDisabled[
                                `${exercise.Exercise.id}-${setIndex}`
                              ] ?? true
                            }
                            isInvalid={
                              checkboxDisabled[
                                `${exercise.Exercise.id}-${setIndex}`
                              ] ?? true
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
              <CardFooter className="gap-2 px-5 bg-zinc-800">
                <ButtonGroup>
                  <Button
                    onClick={() => handleAddSet(exercise.Exercise.id)}
                    className="gap-unit-1"
                    size="sm"
                  >
                    <IconPlus size={16} />
                    Add Set
                  </Button>
                  <Button
                    onClick={() => handleRemoveSet(exercise.Exercise.id)}
                    className="gap-unit-1"
                    size="sm"
                    isDisabled={setsCount[exercise.Exercise.id] <= 1}
                  >
                    <IconX size={16} />
                    Remove Set
                  </Button>
                </ButtonGroup>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Button isLoading={isSubmitting} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
