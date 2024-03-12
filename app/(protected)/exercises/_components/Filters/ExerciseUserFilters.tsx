import { Card, CardBody } from "@nextui-org/card";
import ExerciseFilterFavourites from "./ExerciseFilterFavourites";
import ExerciseFilterUserEquipment from "./ExerciseFilterUserEquipment";

export default function ExerciseUserFilters() {
  return (
    <Card shadow="none" radius="sm" className="shadow-sm bg-zinc-100 dark:bg-zinc-800">
      <CardBody className="flex-row gap-5">
        <ExerciseFilterFavourites />
        <ExerciseFilterUserEquipment />
      </CardBody>
    </Card>
  );
}
