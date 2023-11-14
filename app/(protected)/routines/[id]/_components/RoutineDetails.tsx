import { ChangeEvent } from 'react';
import {Input} from "@nextui-org/input";

type RoutineDetailsProps = {
    routineName: string;
    setRoutineName: (value: string) => void;
    notes: string;
    setNotes: (value: string) => void;
};

export const RoutineDetails: React.FC<RoutineDetailsProps> = ({ routineName, setRoutineName, notes, setNotes }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
            <Input 
                name='routineName' 
                placeholder='Routine Name' 
                value={routineName} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRoutineName(e.target.value)}
            />
            <Input 
                name='routineNotes' 
                placeholder='Notes' 
                value={notes} 
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNotes(e.target.value)}
            />
        </div>
    );
}
