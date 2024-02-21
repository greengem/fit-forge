import { Input } from "@nextui-org/input";
import RoutineCard from "../_components/RoutineCard";
import { Button } from "@nextui-org/button";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";

export default function ActivityManager({ activity }) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3">
        <Input
          type="text"
          className="mb-3"
          name="duration"
          label="Total Workout Duration"
          value={activity.duration}
        />
        <Input
          type="text"
          className="mb-3"
          name="duration"
          label="Date and Time"
          value={activity.date}
        />
      </div>
      <div className="space-y-5 mb-5">
        {activity.exercises.map((exercise, index) => (
          <RoutineCard key={index} exercise={exercise} />
        ))}
      </div>
      <div className="flex space-x-2">
        <Button className="gap-unit-1" color="success">
          <IconDeviceFloppy />
          Save Changes
        </Button>
        <Button className="gap-unit-1" color="danger">
          <IconX />
          Cancel
        </Button>
      </div>
    </>
  );
}
