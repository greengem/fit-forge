import ProgressBar from './ProgressBar';
import { Button } from "@nextui-org/button";
import { IconPlayerPlay, IconPlayerPause, IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { useWorkoutControls } from '@/contexts/WorkoutControlsContext';

export default function StatusBar({ completeWorkout, cancelWorkout, progressPercentage, activeRoutineId }) {
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
                    {!workoutStartTime && (
                        <Button color='primary' onPress={handleStartWorkout}>
                            <IconPlayerPlay /> Start Workout
                        </Button>
                    )}
                    {workoutStartTime && (
                        <>
                        <div className='hidden md:block justify-start space-x-2'>
                            <Button color={isPaused ? 'default' : 'warning'} onPress={handlePauseToggle}>
                                {isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
                                <span>{isPaused ? 'Resume' : 'Pause'}</span>
                            </Button>
                            <Button onPress={completeWorkout} color='primary'>
                                <IconDeviceFloppy /><span>Save</span>
                            </Button>
                            <Button color='danger' onPress={cancelWorkout}>
                                <IconX /><span>Cancel</span>
                            </Button>
                        </div>
                        <div className='block md:hidden justify-start space-x-3'>
                            <Button isIconOnly color={isPaused ? 'default' : 'warning'} onPress={handlePauseToggle}>
                                {isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
                            </Button>
                            <Button isIconOnly onPress={completeWorkout} color='primary'>
                                <IconDeviceFloppy />
                            </Button>
                            <Button isIconOnly color='danger' onPress={cancelWorkout}>
                                <IconX />
                            </Button>
                        </div>
                        </>
                    )}
                <p className={`text-3xl ${isPaused ? 'text-warning' : ''}`}>{formatDuration(workoutDuration)}</p>
            </div>
            <ProgressBar percentage={progressPercentage} />
        </div>
    )
}