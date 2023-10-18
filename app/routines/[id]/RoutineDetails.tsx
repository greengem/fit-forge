import { ChangeEvent } from 'react';

type RoutineDetailsProps = {
    routineName: string;
    setRoutineName: (value: string) => void;
    notes: string;
    setNotes: (value: string) => void;
};

export const RoutineDetails: React.FC<RoutineDetailsProps> = ({ routineName, setRoutineName, notes, setNotes }) => {
    return (
        <div>
            <input 
                name='routineName' 
                placeholder='Routine Name' 
                value={routineName} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRoutineName(e.target.value)}
            />
            <textarea 
                name='routineNotes' 
                placeholder='Notes' 
                value={notes} 
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
            />
        </div>
    );
}
