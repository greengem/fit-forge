import ProgressBar from './ProgressBar';
import { Button } from "@nextui-org/button";
import { IconPlayerPlay, IconPlayerPause, IconDeviceFloppy } from '@tabler/icons-react';
import { useWorkoutControls } from '@/contexts/WorkoutControlsContext';

export default function StatusBar({ completeWorkout, handleCancelWorkout, progressPercentage, activeRoutineId }) {
    const { 
        workoutStartTime, setWorkoutStartTime,
        workoutDuration, 
        formatDuration, 
        isPaused, setIsPaused,
        isSaving, 
        startWorkout,
        togglePause 
    } = useWorkoutControls();

    const handlePauseToggle = () => {
        togglePause(workoutStartTime, isPaused, setIsPaused);
    };

    const handleStartWorkout = () => {
        startWorkout(activeRoutineId, setWorkoutStartTime);
    };

    return (
        <div className='fixed bottom-0 right-0 left-0 md:left-64 p-5 bg-white dark:bg-content1 z-10'>
            <div className='flex justify-between mb-5'>
                <div className='flex justify-start gap-2'>
                    {!workoutStartTime && (
                        <Button color='success' onClick={handleStartWorkout}>
                            <IconPlayerPlay /> Start Workout
                        </Button>
                    )}

                    {workoutStartTime && (
                        <Button color={isPaused ? 'default' : 'warning'} onClick={handlePauseToggle}>
                            {isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
                            {isPaused ? 'Resume Workout' : 'Pause Workout'}
                        </Button>
                    )}

                    {workoutStartTime && (
                        <>
                        <Button type='submit' color='success'>
                            <IconDeviceFloppy /><span className='hidden md:block'>Finish Workout</span>
                        </Button>
                        <Button color='danger' onClick={handleCancelWorkout}>
                            <span className='hidden md:block'>Cancel Workout</span>
                        </Button>
                        </>
                    )}
                </div>
                <p className={`text-3xl ${isPaused ? 'text-warning' : ''}`}>{formatDuration(workoutDuration)}</p>
            </div>
            <ProgressBar percentage={progressPercentage} />
        </div>
    )
}