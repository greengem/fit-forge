'use client'
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Button } from "@nextui-org/button"
import { IconList, IconPlus } from "@tabler/icons-react"

export default function ExerciseAddToRoutineButton({ exerciseId } : { exerciseId: string }) {
    return (
        <Popover placement="left">
            <PopoverTrigger><Button isIconOnly isDisabled><IconPlus size={20} /></Button></PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="flex items-center gap-1 font-bold mb-3"><IconList size={18} />Add to Routine</div>
                    <div>This is the popover content</div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
