import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {Progress} from "@nextui-org/progress";
import { IconTrophy } from "@tabler/icons-react";

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
}

function getCurrentStreak(workouts) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to the start of the day

    // Sort workouts by createdAt in descending order (most recent first)
    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let streak = 0;

    for (let i = 0; i < sortedWorkouts.length; i++) {
        const workoutDate = new Date(sortedWorkouts[i].createdAt);
        workoutDate.setHours(0, 0, 0, 0);

        const daysDifference = (today - workoutDate) / (1000 * 60 * 60 * 24);

        if (daysDifference === streak) {
            streak++;
        } else if (daysDifference > 1) {
            break; // Found a gap in the streak
        }
    }

    return streak;
}

export default function DashboardCards({ workouts }) {
    const totalWeightLifted = workouts.reduce((totalWeight, workout) => {
		return totalWeight + workout.exercises.reduce((exerciseWeight, exercise) => {
			return exerciseWeight + exercise.sets.reduce((setWeight, set) => setWeight + set.weight, 0);
		}, 0);
	}, 0);
	const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
	const averageDuration = workouts.length ? totalDuration / workouts.length : 0;
	const formattedAverageDuration = formatDuration(averageDuration);
    const streak = getCurrentStreak(workouts);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
            

            <Card>
                <CardHeader className="px-5">Workouts Completed</CardHeader>
                <CardBody className="text-5xl pt-0 text-success gap-y-3">
                    <p>{workouts.length}</p>
                    <Progress color="success" aria-label="Loading..." value={60} className="max-w-md"/>
                </CardBody>
            </Card>

            <Card >
                <CardHeader className="px-5">Average Workout Duration</CardHeader>
                <CardBody className="text-5xl pt-0 text-success gap-y-3">
                    <p>{formattedAverageDuration}</p>
                    <Progress color="success" aria-label="Loading..." value={20} className="max-w-md"/>
                </CardBody>
            </Card>

            <Card >
                <CardHeader className="px-5">Current Streak</CardHeader>
                <CardBody className="text-5xl pt-0 text-success gap-y-3">
                    <p>{streak}</p>
                    <Progress color="success" aria-label="Current streak progress" value={streak} max={30} className="max-w-md"/>
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="px-5">Personal Bests</CardHeader>
                <CardBody className="text-3xl pt-0">
                    <div className="flex gap-x-2 text-success">
                    <IconTrophy size={48} /><IconTrophy size={48} /><IconTrophy size={48} />
                    </div>
                </CardBody>
            </Card>

        </div>
    )
}