"use client";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import CardGrid from "@/components/Grid/CardGrid";
import {Card, CardHeader, CardBody } from "@nextui-org/card";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown";
import { Button } from "@nextui-org/button";
import { IconMenu2 } from "@tabler/icons-react";

export default function RoutineCards({ routines }) {
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
        {routines.map((routine) => (
          <Card key={routine.id}>

            <CardHeader className="flex gap-3 px-5">
                <div className="flex flex-col flex-grow">
                    <p className="text-md font-semibold">{routine.name}</p>
                    <p className="text-small text-default-500">Updated: {new Date(routine.updatedAt).toLocaleDateString()}</p>
                </div>
                <Dropdown>
                    <DropdownTrigger>
                        <Button color="success" variant="light" isIconOnly size="sm"><IconMenu2 /></Button>
                    </DropdownTrigger>
                    <DropdownMenu color="success" aria-label="Routine Actions" onAction={(key) => handleAction(key, routine)}>
                        <DropdownItem key="edit">Edit Routine</DropdownItem>
                        <DropdownItem key="delete" className="text-danger" color="danger">Delete Routine</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </CardHeader>

            <CardBody className="pt-0">
              
              <ul className="space-y-1">
              {routine.WorkoutPlanExercise.sort((a, b) => a.order - b.order).map((exerciseDetail) => (
                  <li key={exerciseDetail.Exercise.id}>
                    {exerciseDetail.reps && exerciseDetail.reps} x {exerciseDetail.sets && exerciseDetail.sets} {exerciseDetail.Exercise.name}
                  </li>
              ))}
              </ul>
              {/*routine.notes && <p className="text-default-500 mt-2">Notes: {routine.notes}</p>*/}
            </CardBody>
          </Card>
        ))}
      </CardGrid>
    )
}