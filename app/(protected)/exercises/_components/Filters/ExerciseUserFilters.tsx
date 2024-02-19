import { Card, CardBody } from "@nextui-org/card";
import ExerciseFilterFavourites from "./ExerciseFilterFavourites";
import ExerciseFilterUserEquipment from "./ExerciseFilterUserEquipment";

export default function ExerciseUserFilters() {
    return (
        <Card>
            <CardBody className="flex-row gap-5">
                <ExerciseFilterFavourites />
                <ExerciseFilterUserEquipment />
            </CardBody>
        </Card>
    )
}
