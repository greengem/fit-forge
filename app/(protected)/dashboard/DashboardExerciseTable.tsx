"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

interface Set {
    weight: number;
    reps: number;
}

interface WorkoutLogExercise {
    id: string | number;
    Exercise: {
        name: string;
    };
    sets: Set[];
}

interface WorkoutTableProps {
    workoutLogExercises: WorkoutLogExercise[];
    workoutName: string;
    workoutDate: string;
}

const DashboardExerciseTable: React.FC<WorkoutTableProps> = ({ workoutLogExercises, workoutName, workoutDate }) => {
    const dateObject = new Date(workoutDate);
    const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;


    return (
        <Table removeWrapper aria-label={`Exercise sets for ${workoutName} on ${formattedDate}`}>
            <TableHeader>
                <TableColumn>EXERCISE</TableColumn>
                <TableColumn>BEST SET</TableColumn>
            </TableHeader>
            <TableBody>
            {workoutLogExercises.map(wle => {
                const bestSet = wle.sets.reduce((best, set) => {
                    return set.weight > best.weight ? set : best;
                }, { weight: 0, reps: 0 });

                return (
                    <TableRow key={wle.id}>
                        <TableCell>{wle.Exercise.name}</TableCell>
                        <TableCell>{bestSet.reps} X {bestSet.weight} KG</TableCell>
                    </TableRow>
                );
            })}
            </TableBody>
        </Table>
    );
};

export default DashboardExerciseTable;
