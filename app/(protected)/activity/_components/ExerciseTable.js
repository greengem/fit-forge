"use client";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@nextui-org/table";
import { IconTrophy } from "@tabler/icons-react";


const ExerciseTable = ({ workoutLogExercises, workoutName, workoutDate, personalBests }) => {
  const dateObject = new Date(workoutDate);
  const formattedDate = `${dateObject.getDate()}/${dateObject.getMonth() + 1}/${dateObject.getFullYear()}`;

  const findBestSet = (sets) => {
    let bestSet = sets[0];
    
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
  const bestSet = exercise.sets.length > 0 ? findBestSet(exercise.sets) : null;
  return (
    <TableRow key={exercise.id}>
      <TableCell className="truncate whitespace-nowrap max-w-[164px] py-0 pl-0">{exercise.Exercise.name}</TableCell>
      {
        bestSet ? (
          bestSet.exerciseDuration === null ? (
            <TableCell className="py-0 pr-0 text-right">{`${bestSet.weight}kg x ${bestSet.reps}`} reps</TableCell>
          ) : (
            <TableCell className="py-0 pr-0 text-right">{`${bestSet.exerciseDuration}`} secs</TableCell>
          )
        ) : (
          <TableCell className="py-0 pr-0 text-right">No sets available</TableCell>
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
