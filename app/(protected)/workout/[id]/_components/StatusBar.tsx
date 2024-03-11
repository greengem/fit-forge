"use client";
import ProgressBar from "./ProgressBar";
import { useSidebarToggleContext } from "@/contexts/SidebarToggleContext";
import clsx from "clsx";
import { Button } from "@nextui-org/button";
import {
  IconPlayerPlay,
  IconPlayerPause,
  IconDeviceFloppy,
  IconX,
} from "@tabler/icons-react";
import { useWorkoutControls } from "@/contexts/WorkoutControlsContext";

interface StatusBarProps {
  completeWorkout: () => void;
  cancelWorkout: () => void;
  progressPercentage: number;
  activeRoutineId: string;
}

export default function StatusBar({
  completeWorkout,
  cancelWorkout,
  progressPercentage,
  activeRoutineId,
}: StatusBarProps) {
  const {
    workoutStartTime,
    workoutDuration,
    formatDuration,
    isPaused,
    startWorkout,
    togglePause,
  } = useWorkoutControls();

  const { sidebarCollapse } = useSidebarToggleContext();

  const statusBarClass = clsx(
    "fixed bottom-0 right-0 left-0 p-5 bg-white dark:bg-content1 z-10",
    {
      "md:left-20": sidebarCollapse,
      "md:left-64": !sidebarCollapse,
    },
  );

  const handlePauseToggle = () => {
    togglePause();
  };

  const handleStartWorkout = () => {
    startWorkout(activeRoutineId);
  };

  return (
    <div className={statusBarClass}>
      <div className="flex justify-between mb-5">
        {!workoutStartTime && (
          <Button color="primary" onPress={handleStartWorkout}>
            <IconPlayerPlay /> Start Workout
          </Button>
        )}
        {workoutStartTime && (
          <>
            <div className="hidden md:block justify-start space-x-2">
              <Button
                color={isPaused ? "default" : "warning"}
                onPress={handlePauseToggle}
              >
                {isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
                <span>{isPaused ? "Resume" : "Pause"}</span>
              </Button>
              <Button onPress={completeWorkout} color="primary">
                <IconDeviceFloppy />
                <span>Save</span>
              </Button>
              <Button color="danger" onPress={cancelWorkout}>
                <IconX />
                <span>Cancel</span>
              </Button>
            </div>
            <div className="block md:hidden justify-start space-x-3">
              <Button
                isIconOnly
                color={isPaused ? "default" : "warning"}
                onPress={handlePauseToggle}
              >
                {isPaused ? <IconPlayerPlay /> : <IconPlayerPause />}
              </Button>
              <Button isIconOnly onPress={completeWorkout} color="primary">
                <IconDeviceFloppy />
              </Button>
              <Button isIconOnly color="danger" onPress={cancelWorkout}>
                <IconX />
              </Button>
            </div>
          </>
        )}
        <p className={clsx("text-3xl", { "text-warning": isPaused })}>
          {formatDuration(workoutDuration)}
        </p>
      </div>
      <ProgressBar percentage={progressPercentage} />
    </div>
  );
}
