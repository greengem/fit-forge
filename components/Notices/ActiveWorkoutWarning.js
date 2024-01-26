"use client";
import { usePathname } from 'next/navigation';
import { useWorkoutControls } from '@/contexts/WorkoutControlsContext';
import Link from "next/link";
import { IconAlertCircleFilled, IconAlertTriangleFilled } from '@tabler/icons-react';
import { Button } from '@nextui-org/react';
export default function ActiveWorkoutWarning() {
    const { activeWorkoutRoutine } = useWorkoutControls();
    const pathname = usePathname();
    const workoutPath = `/workout/${activeWorkoutRoutine}`;
    
    if (!activeWorkoutRoutine || pathname === workoutPath) {
        return null;
    }

    return (
        <div className="py-3 px-4 bg-default-100 rounded-lg flex justify-between items-center">
            <div className='flex gap-2'>
                <span className='text-warning'><IconAlertCircleFilled /></span>
                <span>You have an active workout</span>
            </div>
            <Button color='primary' as={Link} href={`/workout/${activeWorkoutRoutine}`}>Resume Workout</Button>
        </div>
    );
}
