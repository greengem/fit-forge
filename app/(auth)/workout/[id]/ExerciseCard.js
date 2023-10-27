import ExerciseTable from './ExerciseTable';
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import { IconPlus, IconX } from '@tabler/icons-react';

export default function ExerciseCard({ exerciseDetail, index, exercises, weights, reps, durations, handleCompletion, handleWeightChange, handleDurationChange, handleRepChange, addSet, removeSet }) {
    return (
        <Card shadow="none">
            <CardHeader className='font-semibold text-xl px-5'>
                {exerciseDetail.order + ". " + exerciseDetail.Exercise.name}
            </CardHeader>
            <CardBody>
            <ExerciseTable 
                exerciseDetail={exerciseDetail} 
                index={index}
                exercises={exercises}
                weights={weights}
                reps={reps}
                durations={durations}
                handleCompletion={handleCompletion}
                handleWeightChange={handleWeightChange}
                handleRepChange={handleRepChange}
                handleDurationChange={handleDurationChange}
            />
            </CardBody>
            <CardFooter className='gap-2 px-5'>
                <Button className='gap-unit-1' size='sm' onClick={() => addSet(index, exerciseDetail.Exercise.name)}>
                    <IconPlus size={16} />Add Set
                </Button>
                <Button className='gap-unit-1' size='sm' onClick={() => removeSet(index, exerciseDetail.Exercise.name)}>
                    <IconX size={16} />Remove Set
                </Button>
            </CardFooter>
        </Card>
    );
}
