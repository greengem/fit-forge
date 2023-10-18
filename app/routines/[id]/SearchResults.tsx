import { Exercise } from '@/types';

type SearchResultsProps = {
    searchResults: Exercise[];
    selectedExercises: Exercise[];
    addExerciseToRoutine: (exercise: Exercise) => void;
};

export const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, addExerciseToRoutine, selectedExercises }) => {
    return (
        <div className="space-y-2">
            <h3 className="text-xl font-semibold">Search Results:</h3>
            <ul className="space-y-1">
            {searchResults.map(exercise => (
                <li key={exercise.id} className="flex items-center justify-between">
                    {exercise.name}
                    <button 
                        onClick={() => addExerciseToRoutine(exercise)} 
                        className="px-3 py-1 bg-green-500 text-white rounded shadow-sm hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200"
                        disabled={selectedExercises.some(e => e.id === exercise.id)}
                    >
                        Add
                    </button>
                </li>
            ))}
            </ul>
        </div>
    );
}
