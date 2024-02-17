import { Button } from '@nextui-org/button'
import { User } from '@nextui-org/user';
import { IconPlus } from '@tabler/icons-react';

interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps?: number;
    duration?: number;

    image?: string;
    order?: number;
    trackingType: 'reps' | 'duration';
}

type SearchResultsProps = {
    searchResults: Exercise[];
    selectedExercises: Exercise[];
    addExerciseToRoutine: (exercise: Exercise) => void;
};

export const SearchResults: React.FC<SearchResultsProps> = ({ searchResults, addExerciseToRoutine, selectedExercises }) => {
    return (
        <div className="max-h-72 overflow-y-auto">
            <ul className="space-y-2 px-2">
            {searchResults.map(exercise => (
                <li key={exercise.id}>
                    <div className='flex justify-between items-center'>
                        <User
                            avatarProps={{ radius: "lg", src: `/images/exercises/${exercise.image}/images/0.jpg` }}
                            description={(exercise as any).category}
                            name={exercise.name}
                        />
                    <Button 
                        isIconOnly
                        color='primary'
                        onPress={() => addExerciseToRoutine(exercise)} 
                        isDisabled={selectedExercises.some(e => e.id === exercise.id)}
                        size='sm'
                    >
                        <IconPlus size={12} />
                    </Button>
                    </div>
                </li>
            ))}
            </ul>
        </div>
    );
}
