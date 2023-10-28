import ProgressBar from './ProgressBar';
import { Button } from "@nextui-org/button";
import { IconPlayerPlay, IconPlayerPause, IconDeviceFloppy } from '@tabler/icons-react';

export default function StatusBar({ workoutStartTime, isPaused, togglePause, completeWorkout, formatDuration, workoutDuration, progressPercentage, isSaving }) {
    return (
        <div className='fixed bottom-0 right-0 left-0 md:left-64 p-5 bg-white dark:bg-content1 z-10'>
            <div className='flex justify-between mb-5'>
                <div className='flex justify-start gap-2'>
                    <Button 
                        color={workoutStartTime ? (isPaused ? 'success' : 'warning') : 'success'} 
                        onClick={togglePause} 
                        disabled={!workoutStartTime && isPaused}
                    >
                        {!workoutStartTime 
                            ? <> 
                                <IconPlayerPlay /> 
                                Start Workout
                            </>
                            : (isPaused 
                                ? <>
                                    <IconPlayerPlay /> 
                                    <span className='hidden md:block'>Resume Workout</span>
                                </>
                                : <>
                                    <IconPlayerPause />
                                    <span className='hidden md:block'>Pause Workout</span>
                                </>
                            )
                        }
                    </Button>
                    {workoutStartTime && (
                        <Button color='primary' onClick={completeWorkout} isLoading={isSaving}>
                            <IconDeviceFloppy /><span className='hidden md:block'>Finish Workout</span>
                        </Button>
                    )}
                </div>
                <p className={`text-3xl ${isPaused ? 'text-warning' : ''}`}>{formatDuration(workoutDuration)}</p>
            </div>
            <ProgressBar percentage={progressPercentage} />
        </div>
    )
}