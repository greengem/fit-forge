"use client";
import { useState } from "react";
import { toast } from "sonner";
import { handleUpdateUserMeasurements } from "@/server-actions/UserServerActions";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconDeviceFloppy, IconRulerMeasure } from "@tabler/icons-react";

interface UserMeasurements {
  weight?: number | null;
  height?: number | null;
  age?: number | null;
}

export default function ProfileMeasurements({
  userMeasurements,
}: {
  userMeasurements: UserMeasurements | null;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState(userMeasurements?.age || "");
  const [height, setHeight] = useState(userMeasurements?.height || "");
  const [weight, setWeight] = useState(userMeasurements?.weight || "");

  const handleSubmit = async () => {
    setIsLoading(true);

    const data = {
      age: age.toString(),
      height: height.toString(),
      weight: weight.toString(),
    };

    const response = await handleUpdateUserMeasurements(data);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="text-xl font-semibold px-5 pb-0 gap-x-3  items-center">
        <IconRulerMeasure className="text-danger" />
        Measurements
      </CardHeader>
      <CardBody className="gap-y-3 px-5">
        <Input
          type="number"
          label="Height (cm)"
          size="sm"
          placeholder="Enter your Height"
          value={height.toString()}
          onChange={(e) => setHeight(e.target.value)}
        />

        <Input
          type="number"
          label="Weight (kg)"
          size="sm"
          placeholder="Enter your Weight"
          value={weight.toString()}
          onChange={(e) => setWeight(e.target.value)}
        />

        <Input
          type="number"
          label="BMI"
          size="sm"
          value={(Number(weight) / (Number(height) / 100) ** 2).toFixed(2)}
          isDisabled
        />

        <Input
          type="number"
          label="Age"
          size="sm"
          placeholder="Enter your Age"
          value={age.toString()}
          onChange={(e) => setAge(e.target.value)}
        />

        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Your data is secure with us. We only use your information to enhance
          your user experience and never share it with third parties.
        </p>
      </CardBody>
      <CardFooter className="px-5">
        <Button
          variant="flat"
          onPress={handleSubmit}
          isLoading={isLoading}
          startContent={<IconDeviceFloppy size={20} />}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
