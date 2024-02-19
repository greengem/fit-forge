import { Button } from '@nextui-org/button'
import { User } from '@nextui-org/user';
import { IconPlus } from '@tabler/icons-react';

type SearchExercise = {
    id: string;
    name: string;
    trackingType: string;
    category: string;
    image: string;
};

type SearchResultsProps = {
    searchResults: SearchExercise[];
    addExerciseToRoutine: (exercise: SearchExercise) => void;
};

export default function SearchResults({ searchResults, addExerciseToRoutine }: SearchResultsProps) {
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
