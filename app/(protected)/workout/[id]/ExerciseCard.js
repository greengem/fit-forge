import ExerciseTable from './ExerciseTable';
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';

export default function ExerciseCard({ exerciseDetail, index, exercises, weights, reps, handleCompletion, handleWeightChange, handleRepChange, addSet, removeSet }) {
    return (
        <Card key={exerciseDetail.Exercise.id} className='mb-10'>
            <CardHeader className='font-semibold text-xl'>{exerciseDetail.order + ". " + exerciseDetail.Exercise.name}</CardHeader>
            <CardBody>
            <ExerciseTable 
                exerciseDetail={exerciseDetail} 
                index={index}
                exercises={exercises}
                weights={weights}
                reps={reps}
                handleCompletion={handleCompletion}
                handleWeightChange={handleWeightChange}
                handleRepChange={handleRepChange}
            />
            </CardBody>
            <CardFooter className='gap-2'>
                <Button onClick={() => addSet(index, exerciseDetail.Exercise.name)}>Add Set</Button>
                <Button onClick={() => removeSet(index, exerciseDetail.Exercise.name)}>Remove Set</Button>
            </CardFooter>
        </Card>
    );
}
