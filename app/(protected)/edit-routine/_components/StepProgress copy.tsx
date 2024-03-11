"use client";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Link from "next/link";

export default function StepProgress({
  routineId,
}: {
  routineId: string | null;
}) {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mb-3">
      <div className="grid grid-cols-3 text-center text-xs">
        <div
          className={clsx("px-4 py-3 rounded-l-xl", {
            "bg-zinc-700": pathname.includes("step-1"),
            "bg-zinc-800": !pathname.includes("step-1"),
          })}
        >
          Step 1: Name
        </div>

        <div
          className={clsx("px-4 py-3 border-r-2 border-l-2 border-zinc-900", {
            "bg-zinc-700": pathname.includes("step-2"),
            "bg-zinc-800 border-zinc-900": !pathname.includes("step-2"),
          })}
        >
          Step 2: Exercises
        </div>

        <div
          className={clsx("px-4 py-3 rounded-r-xl", {
            "bg-zinc-700": pathname.includes("step-3"),
            "bg-zinc-800": !pathname.includes("step-3"),
          })}
        >
          Step 3: Details
        </div>
      </div>
    </div>
  );
}
