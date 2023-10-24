"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { Exercise } from '@/types/workout';
import { IconTrophy } from "@tabler/icons-react";

interface PersonalBest {
    exerciseId: string;
    weight: number;
    reps: number;
}

interface WorkoutTableProps {
    workoutLogExercises: Exercise[];
    workoutName: string;
    workoutDate: Date;
    personalBests: PersonalBest[];
}

const ExerciseTable: React.FC<WorkoutTableProps> = ({ workoutLogExercises, workoutName, workoutDate, personalBests }) => {
    const formattedDate = `${workoutDate.getDate()}/${workoutDate.getMonth() + 1}/${workoutDate.getFullYear()}`;

    return (
        <Table removeWrapper aria-label={`Exercise sets for ${workoutName} on ${formattedDate}`}>
            <TableHeader>
                <TableColumn>EXERCISE</TableColumn>
                <TableColumn>BEST SET</TableColumn>
                <TableColumn>PB</TableColumn>
            </TableHeader>
            <TableBody>
            {workoutLogExercises.map(wle => {
                const bestSet = wle.sets.reduce((best, set) => (set.weight > best.weight ? set : best), { weight: 0, reps: 0 });

                const personalBest = personalBests.find(pb => pb.exerciseId === wle.exerciseId);
                
                const isPersonalBest = personalBest && bestSet.weight >= personalBest.weight && bestSet.reps >= personalBest.reps;

                return (
                    <TableRow key={wle.id}>
                        <TableCell>{wle.Exercise.name}</TableCell>
                        <TableCell>{`${bestSet.reps} X ${bestSet.weight} KG`}</TableCell>
                        <TableCell className="text-success">{isPersonalBest && <IconTrophy />}</TableCell>
                    </TableRow>
                );
            })}
            </TableBody>
        </Table>
    );
};

export default ExerciseTable;
