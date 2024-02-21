'use client'
import { useContext } from "react";
import { Button } from "@nextui-org/button"
import { IconInfoCircle } from "@tabler/icons-react"
import { ExerciseDetailModalContext } from "@/contexts/ExerciseDetailModalContext";
import { Exercise } from "@prisma/client";

export default function ExerciseInfoButton({ exercise } : { exercise: Exercise }) {
    const { setExercise, onOpen } = useContext(ExerciseDetailModalContext);

    const handleClick = () => {
        setExercise(exercise);
        onOpen();
    };

    return (
        <Button isIconOnly onPress={handleClick}>
            <IconInfoCircle size={20} />
        </Button>
    );
}