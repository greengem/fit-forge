"use client";
import React from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ExerciseTable from "./ExerciseTable";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { IconMenu2 } from "@tabler/icons-react";

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
}

const WorkoutCards = ({ workouts, personalBests, showDeleteButton }) => {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedWorkout, setSelectedWorkout] = React.useState(null);

    const handleAction = (key, workout) => {
        if (key === "delete") {
            handleDelete(workout.id);
        } else if (key === "details") {
            setSelectedWorkout(workout);
            onOpen();
        }
    }

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this workout?');

        if (!isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`/api/workouts/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the workout');
            }

            toast.success('Workout deleted successfully!');
            router.refresh();
        } catch (error) {
            toast.error('There was an error deleting the workout:');
        }
    }

    return (
        <>
            {workouts.map((workout) => {
                const totalWeightLifted = workout.exercises.reduce((acc, exercise) => {
                    return acc + exercise.sets.reduce((acc, set) => acc + set.weight, 0);
                }, 0);
                return (
                    <Card shadow="none" key={workout.id} className="shadow-md">
                        <CardHeader className="flex justify-between items-start gap-3 px-5">
                            <div className="flex flex-col flex-grow">
                                <p className="text-md font-semibold text-success mb-1">{workout.name}</p>
                                <p className="text-sm text-default-500">
                                    <span className="flex space-x-1">
                                        <time>{format(new Date(workout.createdAt), 'MM/dd/yyyy')}</time>
                                        <span className="text-gray-400">|</span>
                                        <span>{formatDuration(workout.duration)}</span>
                                        <span className="text-gray-400">|</span>
                                        <span>{totalWeightLifted} KG</span>
                                    </span>
                                </p>
                            </div>
                            {showDeleteButton && (
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button color="success" variant="light" isIconOnly size="sm"><IconMenu2 /></Button>
                                    </DropdownTrigger>
                                    <DropdownMenu color="success" aria-label="Workout Actions" onAction={(key) => handleAction(String(key), workout)}>
                                        <DropdownItem key="details">More Details</DropdownItem>
                                        <DropdownItem key="delete" className="text-danger" color="danger">Delete Activity</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            )}
                        </CardHeader>
                        <CardBody className="pt-0 pb-4 px-5">
                            <ExerciseTable workoutLogExercises={workout.exercises} workoutName={workout.name} workoutDate={workout.createdAt} personalBests={personalBests} />
                        </CardBody>
                    </Card>
                );
            })}
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside">
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                {selectedWorkout ? selectedWorkout.name : 'Details'}
                            </ModalHeader>
                            <ModalBody>
                                {selectedWorkout && (
                                    <>
                                        {selectedWorkout.exercises.map((exercise, exerciseIndex) => (
                                            <div key={exerciseIndex} className="mb-5">
                                                <h3 className="text-lg font-semibold mb-2">{exerciseIndex + 1}. {exercise.Exercise.name}</h3>
                                                <Table removeWrapper aria-label={`Details of ${exercise.Exercise.name} Exercise`}>
                                                    <TableHeader>
                                                        <TableColumn className=" max-w-[164px]">SET</TableColumn>
                                                        <TableColumn>{exercise.sets[0].reps === null ? 'DURATION' : 'REPS'}</TableColumn>
                                                        <TableColumn>WEIGHT</TableColumn>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {exercise.sets.map((set, setIndex) => (
                                                            <TableRow key={`${exerciseIndex}-${setIndex}`}>
                                                                <TableCell className=" max-w-[164px]">{setIndex + 1}</TableCell>
                                                                <TableCell>{set.reps === null ? set.exerciseDuration : set.reps}</TableCell>
                                                                <TableCell>{set.weight} KG</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        ))}
                                    </>
                                )}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default WorkoutCards;
