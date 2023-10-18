type SaveButtonProps = {
    handleSave: () => void;
};

export const SaveButton: React.FC<SaveButtonProps> = ({ handleSave }) => {
    return (
        <button onClick={handleSave}>
            Save Routine
        </button>
    );
}
