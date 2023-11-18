"use client";
import { Button } from "@nextui-org/button";
import { IconPlus } from "@tabler/icons-react";

export default function AddToRoutine() {
    return (
        <Button isIconOnly>
            <IconPlus className='hover:text-success' size={20} />
        </Button>
    )
}
