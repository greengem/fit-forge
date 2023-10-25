"use client";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import CardGrid from "@/components/Grid/CardGrid";
import {Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { IconMenu2 } from "@tabler/icons-react";
import { format } from 'date-fns';

export default function RoutineCards({ routines, isSystem }) {
    const router = useRouter()
    const handleAction = (key, routine) => {
        if (key === "edit") {
            router.push(`/routines/${routine.id}`);
        } else if (key === "delete") {
            handleDelete(routine.id);
        }
    }

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this routine?');
        
        if (!isConfirmed) {
            return;
        }
    
        try {
            const response = await fetch(`/api/routines/${id}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) {
                throw new Error('Failed to delete the routine');
            }
            toast.success('Routine deleted successfully!');
            router.refresh();
        } catch (error) {
            console.error('There was an error deleting the routine:', error);
            toast.error('There was an error deleting the routine:');
        }
    }

return (
    <CardGrid>
        {routines.map((routine) => {
            const uniqueCategories = new Set();
            routine.WorkoutPlanExercise.forEach((exerciseDetail) => {
                uniqueCategories.add(exerciseDetail.Exercise.category);
            });

            return (
                <Card key={routine.id}>
                    <CardHeader className="flex gap-3 px-5">
                        <div className="flex flex-col flex-grow">
                            <p className={`text-md font-semibold ${isSystem ? 'text-success' : ''}`}>{routine.name}</p>
                            {!isSystem && (
                                <p className="text-small text-default-500">Updated: {format(new Date(routine.updatedAt), 'MM/dd/yyyy')}</p>
                            )}
                        </div>
                        {!isSystem && (
                        <Dropdown>
                            <DropdownTrigger>
                                <Button color="success" variant="light" isIconOnly size="sm"><IconMenu2 /></Button>
                            </DropdownTrigger>
                            <DropdownMenu color="success" aria-label="Routine Actions" onAction={(key) => handleAction(key, routine)}>
                                <DropdownItem key="edit">Edit Routine</DropdownItem>
                                <DropdownItem key="delete" className="text-danger" color="danger">Delete Routine</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        )}
                    </CardHeader>
                    <CardBody className="pt-0">
                        <ul className="space-y-1 text-sm">
                        {routine.WorkoutPlanExercise.sort((a, b) => a.order - b.order).map((exerciseDetail) => (
                            <li key={exerciseDetail.Exercise.id}>
                                {exerciseDetail.reps && exerciseDetail.reps} x {exerciseDetail.sets && exerciseDetail.sets} {exerciseDetail.Exercise.name}
                            </li>
                        ))}
                        </ul>
                    </CardBody>
                    <CardFooter className="gap-x-1 pt-0 px-5">
                        {Array.from(uniqueCategories).map((category, index) => (
                            <Chip radius="sm" size="sm" className="capitalize" key={index}>{category}</Chip>
                        ))}
                    </CardFooter>
                </Card>
            );
        })}
    </CardGrid>
);
}