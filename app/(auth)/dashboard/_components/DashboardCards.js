import { Card, CardHeader, CardBody } from "@nextui-org/card";
import {Progress} from "@nextui-org/progress";
import { IconTrophy } from "@tabler/icons-react";

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
}

function getCurrentStreak(workouts) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    let streak = 0;

    for (let i = 0; i < sortedWorkouts.length; i++) {
        const workoutDate = new Date(sortedWorkouts[i].createdAt);
        workoutDate.setHours(0, 0, 0, 0);

        const daysDifference = (today - workoutDate) / (1000 * 60 * 60 * 24);

        if (daysDifference === streak) {
            streak++;
        } else if (daysDifference > 1) {
            break;
        }
    }
    return streak;
}

export default function DashboardCards({ workouts, numberOfPBsLastWeek }) {
    const totalWeightLifted = workouts.reduce((totalWeight, workout) => {
		return totalWeight + workout.exercises.reduce((exerciseWeight, exercise) => {
			return exerciseWeight + exercise.sets.reduce((setWeight, set) => setWeight + set.weight, 0);
		}, 0);
	}, 0);
	const totalDuration = workouts.reduce((acc, workout) => acc + workout.duration, 0);
	const averageDuration = workouts.length ? totalDuration / workouts.length : 0;
	const formattedAverageDuration = formatDuration(averageDuration);
    const streak = getCurrentStreak(workouts);
    const targetDuration = 60;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">

            <Card>
                <CardHeader className="px-5">Weekly Workouts</CardHeader>
                <CardBody className="text-5xl pt-0 text-success gap-y-3">
                    <p>{workouts.length}</p>
                    <Progress 
                        color="success" 
                        aria-label="Weekly Workouts" 
                        value={(workouts.length / 7) * 100} 
                        className="max-w-md"
                    />
                </CardBody>
            </Card>

            <Card >
                <CardHeader className="px-5">Average Workout Duration</CardHeader>
                <CardBody className="text-5xl pt-0 text-success gap-y-3">
                    <p>{formattedAverageDuration}</p>
                    <Progress 
                        color="success" 
                        aria-label="Average Workout Duration" 
                        value={(averageDuration / targetDuration) * 100} 
                        className="max-w-md"
                    />
                </CardBody>
            </Card>

            <Card >
                <CardHeader className="px-5">Daily Streak</CardHeader>
                <CardBody className="text-5xl pt-0 text-success gap-y-3">
                    <p>{streak}</p>
                    <Progress 
                    color="success" 
                    aria-label="Daily Streak" 
                    value={(streak / 7) * 100} 
                    className="max-w-md"
                    />
                </CardBody>
            </Card>

            <Card>
                <CardHeader className="px-5">Weekly PBs</CardHeader>
                <CardBody className="text-3xl pt-0">
                    <div className="flex gap-x-2 text-success">
                        {Array.from({ length: numberOfPBsLastWeek }).map((_, index) => (
                            <IconTrophy key={index} size={48} />
                        ))}
                    </div>
                </CardBody>
            </Card>

        </div>
    )
}