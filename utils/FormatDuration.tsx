export default function FormatDuration({ seconds }: { seconds: number }) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}m`;
}
