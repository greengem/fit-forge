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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-3">
      <Input
        name="routineName"
        size="sm"
        placeholder="My Awesome Workout Plan"
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
        placeholder="Enter any notes about your workout here..."
        label="Notes"
        value={notes}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNotes(e.target.value)
        }
      />
    </div>
  );
}
