"use client";
import useSWR from "swr";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";
import { Set, Exercise, WorkoutLog } from "./ModalChartTypes";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function RecordsTab({
  exerciseId,
}: {
  exerciseId: string | undefined;
}) {
  const calculate1RM = (weight: number, reps: number): number =>
    weight * (1 + reps / 30);

  const predictWeightForReps = (oneRM: number, reps: number): number => {
    return oneRM / (1 + reps / 30);
  };

  const processRecords = (
    workouts: WorkoutLog[],
  ): {
    bestByReps: Array<{ weight: number; date: string }>;
    maxVolume: { volume: number; weight: number; reps: number; date: string };
    max1RM: number;
  } => {
    let bestByReps = Array.from({ length: 12 }, () => ({
      weight: 0,
      date: "",
    }));
    let maxVolume = { volume: 0, weight: 0, reps: 0, date: "" };
    let max1RM = 0;

    workouts.forEach((workout: WorkoutLog) => {
      workout.exercises.forEach((exercise: Exercise) => {
        exercise.sets.forEach((set: Set) => {
          const { weight, reps } = set;
          const volume = weight * reps;
          const estimated1RM = calculate1RM(weight, reps);

          if (reps <= 12) {
            for (let i = reps - 1; i >= 0; i--) {
              if (weight > bestByReps[i].weight) {
                bestByReps[i] = { weight, date: workout.date };
              }
            }
          }

          if (volume > maxVolume.volume) {
            maxVolume = { volume, weight, reps, date: workout.date };
          }

          max1RM = Math.max(max1RM, estimated1RM);
        });
      });
    });

    return { bestByReps, maxVolume, max1RM };
  };

  const { data, error } = useSWR<WorkoutLog[]>(
    `/api/exercise-history/${exerciseId}`,
    fetcher,
  );
  const { bestByReps, maxVolume, max1RM } = processRecords(data || []);

  if (error) return <div>Failed to load</div>;
  if (!data)
    return (
      <div className="py-10 flex items-center justify-center">
        <Spinner />
      </div>
    );
  if (data.length === 0)
    return (
      <div className="text-zinc-500">
        Previous performances of this exercise will display here - check back
        later!
      </div>
    );

  return (
    <div>
      <h4 className="uppercase text-xs text-zinc-500 mb-3">Personal Records</h4>
      <ul className="space-y-3">
        <li className="flex justify-between">
          <span>1RM</span>
          <span>{max1RM.toFixed(2)}KG</span>
        </li>
        <li className="flex justify-between">
          <span>Weight</span>
          <span>
            {maxVolume.weight}KG (x{maxVolume.reps})
          </span>
        </li>
        <li className="flex justify-between">
          <span>Max Volume</span>
          <span>{maxVolume.volume}KG</span>
        </li>
      </ul>

      <Divider className="my-3" />

      <table className="w-full text-center">
        <thead className="text-xs text-zinc-500 uppercase">
          <tr>
            <th className="font-medium">Reps</th>
            <th className="font-medium">Best Performance</th>
            <th className="font-medium">Predicted</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 12 }, (_, index) => index + 1).map((reps) => (
            <tr key={reps}>
              <td>{reps}</td>
              <td>
                {bestByReps[reps - 1]?.weight > 0 ? (
                  <>
                    <div>{`${bestByReps[reps - 1].weight} kg`}</div>
                    <div className="text-xs">
                      {new Date(bestByReps[reps - 1].date).toLocaleDateString()}
                    </div>
                  </>
                ) : (
                  <div>-</div>
                )}
              </td>
              <td>{predictWeightForReps(max1RM, reps).toFixed(2)} KG</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
