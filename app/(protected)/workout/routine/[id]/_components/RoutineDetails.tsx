import { ChangeEvent } from "react";
import { Input } from "@nextui-org/input";

type RoutineDetailsProps = {
  routineName: string;
  setRoutineName: (value: string) => void;
  notes: string;
  setNotes: (value: string) => void;
};

export default function RoutineDetails({
  routineName,
  setRoutineName,
  notes,
  setNotes,
}: RoutineDetailsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-3">
      <Input
        name="routineName"
        size="sm"
        placeholder="My Workout Plan..."
        label="Routine Name"
        isRequired
        value={routineName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setRoutineName(e.target.value)
        }
      />
      <Input
        name="routineNotes"
        size="sm"
        placeholder="Workout notes..."
        label="Notes"
        value={notes}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNotes(e.target.value)
        }
      />
    </div>
  );
}
