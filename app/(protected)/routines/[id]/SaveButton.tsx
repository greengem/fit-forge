import { Button } from "@nextui-org/button";

type SaveButtonProps = {
    handleSave: () => void;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ handleSave }) => {
    return (
        <Button color="success" onClick={handleSave}>
            Save Routine
        </Button>
    );
}
