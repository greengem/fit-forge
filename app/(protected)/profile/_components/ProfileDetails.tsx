"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { handleUpdateUserInfo } from "@/server-actions/UserServerActions";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { IconUser, IconDeviceFloppy } from "@tabler/icons-react";

interface UserMeasurements {
  weight?: number | null;
  height?: number | null;
  age?: number | null;
}

export default function ProfileDetails({
  username,
  userEmailAddress,
  userMeasurements,
}: {
  username: string | undefined;
  userEmailAddress: string | undefined;
  userMeasurements: UserMeasurements | null;
}) {
  const router = useRouter();
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

    const response = await handleUpdateUserInfo(data);

    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }

    setIsLoading(false);
  };

  return (
    <Card shadow="none" className="shadow-md">
      <CardHeader className="text-xl font-semibold px-5 pb-0 gap-x-3">
        <IconUser />
        Details
      </CardHeader>
      <CardBody className="gap-y-3 px-5">
        <Input
          type="text"
          label="Name"
          placeholder="Enter your name"
          value={username || ""}
          isRequired
          isDisabled
        />

        <Input
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={userEmailAddress || ""}
          isRequired
          isDisabled
        />

        <Input
          type="number"
          label="Age"
          placeholder="Enter your Age"
          value={age.toString()}
          onChange={(e) => setAge(e.target.value)}
        />

        <Input
          type="number"
          label="Height (cm)"
          placeholder="Enter your Height"
          value={height.toString()}
          onChange={(e) => setHeight(e.target.value)}
        />

        <Input
          type="number"
          label="Weight (kg)"
          placeholder="Enter your Weight"
          value={weight.toString()}
          onChange={(e) => setWeight(e.target.value)}
        />

        <p className="text-xs text-gray-500">
          Your data is secure with us. We only use your information to enhance
          your user experience and never share it with third parties.
        </p>
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
