import prisma from "@/db/prisma";
import DashboardChartCard from './DashboardChartCard';
import DashboardChartVolumeLoadClient from './DashboardChartVolumeLoad.client';

type WorkoutVolumeLoadData = {
  workoutLogId: string;
  date: Date;
  name: string;
  totalVolumeLoad: number;
};

export default async function DashboardChartVolumeLoad({ userId } : { userId: string }) {

    const workoutLogs = await prisma.workoutLog.findMany({
      where: {
        userId: userId,
      },
      include: {
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    let workoutVolumeLoads: WorkoutVolumeLoadData[] = workoutLogs.map(workoutLog => {
      const totalVolumeLoad = workoutLog.exercises.reduce((totalExerciseVolume, exercise) => {
        const exerciseVolume = exercise.sets.reduce((totalSetVolume, set) => {
          // Ensure weight is greater than 0 before including in the volume calculation
          if (set.weight && set.weight > 0) {
            const setVolume = set.weight * (set.reps || 0);
            return totalSetVolume + setVolume;
          }
          return totalSetVolume;
        }, 0);
        return totalExerciseVolume + exerciseVolume;
      }, 0);
  
      return {
        workoutLogId: workoutLog.id,
        date: workoutLog.date,
        name: workoutLog.name,
        totalVolumeLoad,
      };
    });

    // Filter out entries with a totalVolumeLoad of 0
    workoutVolumeLoads = workoutVolumeLoads.filter(workout => workout.totalVolumeLoad > 0);
  
    //console.log(workoutVolumeLoads);

    return (
        <DashboardChartCard title='Volume Load' colSpan="col-span-2">
          <DashboardChartVolumeLoadClient data={workoutVolumeLoads} />
        </DashboardChartCard>
    );
}
