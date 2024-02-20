'use client';
import useSWR from 'swr';
import { Card, CardBody, CardHeader } from "@nextui-org/react";

interface Set {
    id: string;
    workoutLogExerciseId: string;
    weight: number;
    reps: number;
    exerciseDuration?: number;
    order?: number;
}

interface Exercise {
    id: string;
    workoutLogId: string;
    exerciseId: string;
    sets: Set[];
}

interface WorkoutLog {
    id: string;
    userId: string;
    workoutPlanId?: string;
    name: string;
    date: Date;
    duration: number;
    createdAt: Date;
    date_updated?: Date;
    exercises: Exercise[];
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function HistoryTab({ exerciseId }: { exerciseId: string | undefined }) {
    const { data, error } = useSWR<WorkoutLog[]>(`/api/exercise-history/${exerciseId}`, fetcher);

    if (error) return <div>Failed to load</div>;
    if (!data) return <div>Loading...</div>;
    if (data.length === 0) return <div className='text-zinc-500'>Previous performances of this exercise will display here - check back later!</div>;

    return (
        <div className="space-y-3">
            {data.map((log: WorkoutLog) => (
                <Card key={log.id} shadow="none" className="shadow-md ring-2 ring-zinc-800">
                    <CardHeader className="flex-col items-start">
                        <h4 className="text-lg">{log.name}</h4>
                        <p className="text-sm text-zinc-500">{new Date(log.date).toLocaleDateString()}</p>
                    </CardHeader>
                    <CardBody className='pt-0'>
                        {log.exercises.map((exercise: Exercise) => (
                            <div key={exercise.id}>
                                <h5>Sets:</h5>
                                <ul>
                                    {exercise.sets.map((set: Set, index: number) => (
                                        <li key={set.id} className="text-zinc-500 flex justify-between">
                                            <span>{`${index + 1}: ${set.weight || '-'}kg x ${set.reps || '-'}`}</span>
                                            <span>{set.weight && set.reps ? `1RM: ${calculateOneRM(set.weight, set.reps)}kg` : 'N/A'}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

function calculateOneRM(weight: number, reps: number): number {
    return Math.round(weight * (36 / (37 - reps)));
}
