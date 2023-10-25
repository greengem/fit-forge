import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

export default function WorkoutCards({ routine }) {
    return (
        <Card key={routine.id}>
            <CardHeader className="flex gap-3 px-5">
            <div className="flex flex-col">
                <p className="text-md font-semibold text-success">{routine.name}</p>
            </div>
            </CardHeader>
            <CardBody className="py-0 pb-2">
            <ul className="space-y-1 text-sm">
                {routine.WorkoutPlanExercise.sort((a, b) => a.order - b.order).map((exerciseDetail) => (
                <li key={exerciseDetail.Exercise.id}>
                    {exerciseDetail.reps && exerciseDetail.reps} x {exerciseDetail.sets && exerciseDetail.sets} {exerciseDetail.Exercise.name}
                </li>
                ))}
            </ul>
            </CardBody>
            <CardFooter className="px-5">
            <Button variant="ghost" as={Link} href={`/workout/${routine.id}`} size="sm" color="success" className="gap-unit-1">
                <IconPlayerPlayFilled size={16} />
                Start Workout
            </Button>
            </CardFooter>
        </Card>
    )
}