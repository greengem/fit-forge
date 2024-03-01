import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";

type SaveButtonProps = {
  handleSave: () => void;
  isLoading: boolean;
};

export default function SaveButton({ handleSave, isLoading }: SaveButtonProps) {
  return (
    <Button variant="flat" onPress={handleSave} isLoading={isLoading}>
      <IconDeviceFloppy size={18} /> Finish
    </Button>
  );
}
