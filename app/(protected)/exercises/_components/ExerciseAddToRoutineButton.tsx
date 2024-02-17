'use client'
import { Exercise } from "@prisma/client"
import { User } from "@nextui-org/user";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover"
import { Button } from "@nextui-org/button"
import { IconPlus } from "@tabler/icons-react"
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";


interface UserRoutine {
    id: string;
    name: string;
    exerciseCount: number;
}

type ExerciseAddToRoutineButtonProps = {
    exercise: Exercise;
    userRoutines: UserRoutine[];
}

export default function ExerciseAddToRoutineButton({ exercise, userRoutines } : ExerciseAddToRoutineButtonProps) {
    return (
        <Popover placement="left" showArrow={true}>
            <PopoverTrigger><Button isIconOnly isDisabled><IconPlus size={20} /></Button></PopoverTrigger>
            <PopoverContent>
                <div className="px-2 pt-2 pb-1 min-w-64">
                    <h4 className="mb-5 text-lg">Add <span className="font-semibold">{exercise.name}</span> to a Routine</h4>

                    <h5 className="font-semibold mb-2">New Routine</h5>

                    <div className="flex items-center gap-3 justify-between">
                        <form>
                            <Input
                                placeholder="My awesome workout plan"
                                labelPlacement="outside"
                            >
                            </Input>
                        </form>
                        <div className="shrink-0"><Button size="md" isIconOnly><IconPlus size={18} /></Button></div>
                    </div>

                    <Divider className="my-2" />

                    <h5 className="font-semibold mb-2">Existing Routines</h5>

                    <ul>
                        {userRoutines.map((routine) => (
                            <li key={routine.id} className="space-y-2 flex gap-x-2 justify-between items-center">
                                <User   
                                    name={routine.name}
                                    description={`${routine.exerciseCount} Exercises`}
                                />
                                <div><Button size="md" variant="flat" isIconOnly><IconPlus size={18} /></Button></div>
                            </li>
                        ))}
                    </ul>
                </div>
            </PopoverContent>
        </Popover>
    )
}
