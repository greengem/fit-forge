'use client'
import { useContext } from "react";
import { Button } from "@nextui-org/button"
import { IconInfoCircle } from "@tabler/icons-react"
import { ExerciseModalContext } from "@/contexts/ExerciseModalContext";
import { Exercise } from "@prisma/client";

export default function ExerciseInfoButton({ exercise } : { exercise: Exercise }) {
    const { setExercise, onOpen } = useContext(ExerciseModalContext);

    const handleClick = () => {
        setExercise(exercise);
        console.log('Opening modal...');
        onOpen();
    };

    return (
        <Button isIconOnly onPress={handleClick}>
            <IconInfoCircle size={20} />
        </Button>
    );
}