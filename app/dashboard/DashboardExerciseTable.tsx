"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";

interface SetLog {
    weight: number;
    reps: number;
}

interface WorkoutLogExercise {
    id: string | number;
    Exercise: {
        name: string;
    };
    SetLog: SetLog[];
}

interface WorkoutTableProps {
    workoutLogExercises: WorkoutLogExercise[];
}

const DashboardExerciseTable: React.FC<WorkoutTableProps> = ({ workoutLogExercises }) => {
    return (
        <Table removeWrapper>
            <TableHeader>
                <TableColumn>EXERCISE</TableColumn>
                <TableColumn>BEST SET</TableColumn>
            </TableHeader>
            <TableBody>
                {workoutLogExercises.map(wle => {
                    const bestSet = wle.SetLog.reduce((best, set) => {
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
