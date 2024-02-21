"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleUpdateUserEquipment } from "@/server-actions/UserServerActions";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { CheckboxGroup, Checkbox } from "@nextui-org/checkbox";
import { Button } from "@nextui-org/button";
import { toast } from "sonner";
import { IconBarbell, IconDeviceFloppy } from "@tabler/icons-react";
import { EquipmentType } from "@prisma/client";

interface ProfileEquipmentProps {
  equipment: string[];
}

const equipmentItems = [
  "body_only",
  "machine",
  "other",
  "foam_roll",
  "kettlebells",
  "dumbbell",
  "cable",
  "barbell",
  "bands",
  "medicine_ball",
  "exercise_ball",
  "e_z_curl_bar",
];

const formatText = (text: string): string => {
  return text
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

function toEquipmentType(items: string[]): EquipmentType[] {
  return items.filter((item): item is EquipmentType =>
    Object.values(EquipmentType).includes(item as EquipmentType),
  );
}

export default function ProfileEquipment({ equipment }: ProfileEquipmentProps) {
  const router = useRouter();
  const [selectedEquipment, setSelectedEquipment] = useState(equipment || []);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);

    const response = await handleUpdateUserEquipment(
      toEquipmentType(selectedEquipment),
    );

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="text-xl font-semibold px-5 pb-0">
        <IconBarbell className="mr-1" />
        Equipment
      </CardHeader>
      <CardBody className="px-5">
        <CheckboxGroup
          value={selectedEquipment}
          onChange={(value) => setSelectedEquipment(value as EquipmentType[])}
          color="primary"
        >
          {equipmentItems.map((item, index) => (
            <Checkbox key={index} value={item}>
              {formatText(item)}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </CardBody>
      <CardFooter className="px-5">
        <Button
          color="primary"
          onPress={handleSubmit}
          isLoading={isLoading}
          startContent={<IconDeviceFloppy />}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
