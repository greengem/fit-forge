"use client";
import { Button } from "@nextui-org/button";
import { IconInfoCircle } from "@tabler/icons-react";
import Link from "next/link";

export default function ShowMoreInfo({ exercise }) {
    return (
        <Button as={Link} href={`/exercises/${exercise.id}`} isIconOnly>
            <IconInfoCircle size={20} className='hover:text-primary' />
        </Button>
    )
}