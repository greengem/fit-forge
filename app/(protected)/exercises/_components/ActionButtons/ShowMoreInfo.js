"use client";
import { Button } from "@nextui-org/button";
import { IconInfoCircle } from "@tabler/icons-react";

export default function ShowMoreInfo({ exercise, setSelectedExercise, onOpen }) {
    return (
        <Button isIconOnly onPress={() => { setSelectedExercise(exercise); onOpen(); }}>
            <IconInfoCircle size={20} className='hover:text-success' />
        </Button>
    )
}