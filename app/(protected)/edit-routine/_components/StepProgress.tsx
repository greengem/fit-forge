"use client";
import { Tabs, Tab } from "@nextui-org/tabs";
import { usePathname } from "next/navigation";

export default function StepProgress({
  routineId,
}: {
  routineId: string | null;
}) {
  const pathname = usePathname();
  const step = pathname.split("/").pop();

  return (
    <div className="flex justify-center mb-5">
      <Tabs
        aria-label="Options"
        selectedKey={step}
        variant="bordered"
        color="primary"
      >
        <Tab
          key="step-1"
          title="Step 1"
          href={`/edit-routine/step-1?id=${routineId}`}
        />
        <Tab
          key="step-2"
          title="Step 2"
          href={`/edit-routine/step-2?id=${routineId}`}
        />
        <Tab
          key="step-3"
          title="Step 3"
          href={`/edit-routine/step-3?id=${routineId}`}
        />
      </Tabs>
    </div>
  );
}
