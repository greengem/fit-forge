import {Progress} from "@nextui-org/progress";
export default function ProgressBar({ percentage }) {
    return (
        <Progress
        aria-label="Downloading..."
        size="md"
        value={percentage}
        color="success"
        showValueLabel={true}
        />
    );
}
