import { Button } from "@nextui-org/button";
import Link from "next/link";
import { IconDeviceFloppy, IconX } from "@tabler/icons-react";
type SaveButtonProps = {
    handleSave: () => void;
    isLoading: boolean;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ handleSave, isLoading }) => {
    return (
        <div className="flex gap-x-2">
            <Button className="gap-unit-1" color="success" onPress={handleSave} isLoading={isLoading}>
                <IconDeviceFloppy size={16} />Save Routine
            </Button>
            <Button className="gap-unit-1" as={Link} href="/routines">
                <IconX size={16} />Cancel
            </Button>
        </div>
    );
}
