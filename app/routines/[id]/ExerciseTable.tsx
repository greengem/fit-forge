import { ChangeEvent, FC } from 'react';

export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    order?: number;
}

type ExerciseTableProps = {
    selectedExercises: Exercise[];
    updateExercise: (index: number, field: 'sets' | 'reps', value: number) => void;
    moveUp: (index: number) => void;
    moveDown: (index: number) => void;
    deleteExercise: (index: number) => void;
};

const ExerciseTable: FC<ExerciseTableProps> = ({ selectedExercises, updateExercise, moveUp, moveDown, deleteExercise }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Exercise</th>
                    <th>Sets</th>
                    <th>Reps</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {selectedExercises.map((exercise, index) => (
                    <tr key={index}>
                        <td>{exercise.name}</td>
                        <td>
                            <input 
                                type="number" 
                                value={exercise.sets} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const intValue = parseInt(e.target.value, 10);
                                    if (!isNaN(intValue)) {
                                        updateExercise(index, 'sets', intValue);
                                    }
                                }}

                            />
                        </td>
                        <td>
                            <input 
                                type="number" 
                                value={exercise.reps} 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    const intValue = parseInt(e.target.value, 10);
                                    if (!isNaN(intValue)) {
                                        updateExercise(index, 'reps', intValue);
                                    }
                                }}

                            />
                        </td>
                        <td>
                            <button className='mr-2' onClick={() => moveUp(index)}>Up</button>
                            <button className='mr-2' onClick={() => moveDown(index)}>Down</button>
                            <button onClick={() => deleteExercise(index)}>Remove</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ExerciseTable;
