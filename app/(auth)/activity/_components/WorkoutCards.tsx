"use client";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import ExerciseTable from "./ExerciseTable";
import { Workout } from '@/types';
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconMenu2 } from "@tabler/icons-react";

function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
}

interface WorkoutCardsProps {
    workouts: Workout[];
    showDeleteButton: boolean;
}

const WorkoutCards: React.FC<WorkoutCardsProps> = ({ workouts, showDeleteButton }) => {
    const router = useRouter()

    const handleAction = (key: string, workout: Workout) => {
        if (key === "delete") {
            handleDelete(workout.id);
        }
    }

    const handleDelete = async (id: string) => {
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
            console.error('There was an error deleting the workout:', error);
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
                        <Card key={workout.id}>
                            <CardHeader className="flex gap-3 px-5">
                                <div className="flex flex-col flex-grow">
                                    <p className="text-md font-semibold">{workout.name}</p>
                                    <p className="text-small text-default-500">{formatDuration(workout.duration)} | {totalWeightLifted} KG</p>
                                </div>
                                {showDeleteButton && (
                                <Dropdown>
                                    <DropdownTrigger>
                                        <Button color="success" variant="light" isIconOnly size="sm"><IconMenu2 /></Button>
                                    </DropdownTrigger>
                                    <DropdownMenu color="success" aria-label="Workout Actions" onAction={(key) => handleAction(String(key), workout)}>
                                        <DropdownItem key="delete" className="text-danger" color="danger">Delete Routine</DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                                 )}
                            </CardHeader>
                            <CardBody className="py-0 pb-2">
                                <ExerciseTable workoutLogExercises={workout.exercises} workoutName={workout.name} workoutDate={workout.createdAt} />
                            </CardBody>
                        </Card>
                );
            })}
        </>
    );
}

export default WorkoutCards;
