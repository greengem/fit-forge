import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";

type SaveButtonProps = {
  handleSave: () => void;
  isLoading: boolean;
};

export default function SaveButton({ handleSave, isLoading }: SaveButtonProps) {
  return (
    <div className="flex gap-x-2">
      <Button
        className="gap-unit-1"
        color="primary"
        onPress={handleSave}
        isLoading={isLoading}
      >
        <IconDeviceFloppy size={16} />
        Save Routine
      </Button>
      <Button className="gap-unit-1" as={Link} href="/workout">
        <IconX size={16} />
        Cancel
      </Button>
    </div>
  );
}
