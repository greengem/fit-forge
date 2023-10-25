import { Button } from '@nextui-org/button'
import { IconPlus } from '@tabler/icons-react';

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    order?: number;
}

type SearchResultsProps = {
    searchResults: Exercise[];
    selectedExercises: Exercise[];
    addExerciseToRoutine: (exercise: Exercise) => void;
};

export const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, addExerciseToRoutine, selectedExercises }) => {
    return (
        <div className="max-h-72 overflow-y-auto">
            <ul className="space-y-1">
            {searchResults.map(exercise => (
                <li key={exercise.id}>
                    <div className='flex items-center gap-2'>
                    <Button 
                        isIconOnly
                        onClick={() => addExerciseToRoutine(exercise)} 
                        isDisabled={selectedExercises.some(e => e.id === exercise.id)}
                        size='sm'
                    >
                        <IconPlus size={12} />
                    </Button>
                    {exercise.name}
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
}
