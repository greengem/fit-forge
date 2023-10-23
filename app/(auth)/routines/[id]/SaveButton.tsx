import { Button } from "@nextui-org/button";

type SaveButtonProps = {
    handleSave: () => void;
    isLoading: boolean;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ handleSave, isLoading }) => {
    return (
        <Button color="success" onClick={handleSave} isLoading={isLoading}>
            Save Routine
        </Button>
    );
}
