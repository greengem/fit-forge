"use client";
import { handleDeleteUserGoal } from "@/server-actions/UserServerActions";
import { IconX } from "@tabler/icons-react";
import { useTransition } from "react";

export default function DeleteDashboardGoal({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      startTransition(() => {
        handleDeleteUserGoal(id);
      });
    }
  };

  return (
    <button onClick={handleClick} disabled={isPending} aria-label="Delete goal">
      <IconX className="text-zinc-500" />
    </button>
  );
}
