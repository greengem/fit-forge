"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { IconTrophy } from "@tabler/icons-react";


const ExerciseTable = ({ workoutLogExercises, workoutName, workoutDate, personalBests }) => {
  const formattedDate = `${workoutDate.getDate()}/${workoutDate.getMonth() + 1}/${workoutDate.getFullYear()}`;

  const findBestSet = (sets) => {
    let bestSet = sets[0]; // default to the first set
    
    sets.forEach((set) => {
      if (set.reps === null) {
        if (bestSet.exerciseDuration < set.exerciseDuration) {
          bestSet = set;
        }
      } else {
        const currentSetScore = set.reps * set.weight;
        const bestSetScore = bestSet.reps * bestSet.weight;
        
        if (currentSetScore > bestSetScore) {
          bestSet = set;
        }
      }
    });

    return bestSet;
  };

  return (
    <Table hideHeader shadow="none" removeWrapper aria-label={`Exercise sets for ${workoutName} on ${formattedDate}`}>
      <TableHeader>
        <TableColumn>EXERCISE</TableColumn>
        <TableColumn>BEST SET</TableColumn>
      </TableHeader>
      <TableBody>
        {workoutLogExercises.map((exercise) => {
          const bestSet = findBestSet(exercise.sets);
          return (
            <TableRow key={exercise.id}>
              <TableCell className="truncate whitespace-nowrap max-w-[164px] py-1 pl-0">{exercise.Exercise.name}</TableCell>
              {
                bestSet.exerciseDuration === null ? (
                  <TableCell className="py-1">{`${bestSet.weight}kg x ${bestSet.reps}`} reps</TableCell>
                ) : (
                  <TableCell className="py-1 pr-0">{`${bestSet.exerciseDuration}`} secs</TableCell>
                )
              }
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default ExerciseTable;
