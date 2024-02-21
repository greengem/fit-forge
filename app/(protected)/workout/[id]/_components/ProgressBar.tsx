import { Progress } from "@nextui-org/progress";
export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <Progress
      aria-label="Workout Progress"
      size="lg"
      value={percentage}
      color="primary"
    />
  );
}
