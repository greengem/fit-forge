'use client'
import { usePathname } from "next/navigation";
import clsx from 'clsx';

export default function StepProgress() {
    const pathname = usePathname();

  return (
    <div className="flex justify-center mb-3">
      <div className="grid grid-cols-3 w-64 text-center text-xs">
        <div className={clsx("py-2 rounded-l-xl", {
          'bg-primary text-black': pathname.includes('step-1'),
          'bg-zinc-800': !pathname.includes('step-1'),
        })}>Step 1</div>
        <div className={clsx("py-2 border-r-1 border-l-1 border-zinc-900", {
          'bg-primary text-black': pathname.includes('step-2'),
          'bg-zinc-800 border-zinc-900': !pathname.includes('step-2'),
        })}>Step 2</div>
        <div className={clsx("py-2 rounded-r-xl", {
          'bg-primary text-black': pathname.includes('step-3'),
          'bg-zinc-800': !pathname.includes('step-3'),
        })}>Step 3</div>
      </div>
    </div>
  );
}