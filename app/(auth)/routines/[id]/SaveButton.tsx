import { Button } from "@nextui-org/button";
import Link from "next/link";

type SaveButtonProps = {
    handleSave: () => void;
    isLoading: boolean;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ handleSave, isLoading }) => {
    return (
        <div className="space-x-2">
            <Button color="success" onClick={handleSave} isLoading={isLoading}>
                Save Routine
            </Button>
            <Button as={Link} href="/routines">Cancel</Button>
        </div>
    );
}
