import { Card, CardHeader, CardBody } from "@nextui-org/card";

function formatDuration(seconds) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m`;
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-5">
            <Card className="bg-success text-black">
                <CardHeader className="px-5">Workouts Completed</CardHeader>
                <CardBody className="text-5xl pt-0">{workouts.length}</CardBody>
            </Card>

            <Card className="bg-primary">
                <CardHeader className="px-5">Total Weight Lifted (kg)</CardHeader>
                <CardBody className="text-5xl pt-0">{totalWeightLifted}</CardBody>
            </Card>

            <Card className="bg-secondary">
                <CardHeader className="px-5">Average Workout Duration</CardHeader>
                <CardBody className="text-5xl pt-0">{formattedAverageDuration}</CardBody>
            </Card>

            <Card className="bg-danger">
                <CardHeader className="px-5">TODO</CardHeader>
                <CardBody className="text-3xl pt-0">TODO</CardBody>
            </Card>
        </div>
    )
}