"use client";
import { useRouter } from "next/navigation";
import { handleDeleteRoutine } from "@/server-actions/RoutineServerActions";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/dropdown";
import {
  IconEdit,
  IconInfoCircle,
  IconMenu2,
  IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";

export default function RoutineMenu({ routineId }: { routineId: string }) {
  const router = useRouter();

  const handleDelete = async (routineId: string) => {
    const response = await handleDeleteRoutine(routineId);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleAction = (key: string, routineId: string) => {
    if (key === "delete") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this routine?",
      );
      if (confirmDelete) {
        handleDelete(routineId);
      }
    } else if (key === "edit") {
      router.push(`/edit-routine/step-1?id=${routineId}`);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="shrink-0" aria-label="Routine actions">
          <IconMenu2 className="text-black dark:text-primary" size={22} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        topContent={
          <h4 className="text-zinc-500 uppercase font-semibold text-xs px-2 pt-2">
            Routine Actions
          </h4>
        }
        onAction={(key) => handleAction(String(key), routineId)}
      >
        <DropdownSection showDivider>
          <DropdownItem startContent={<IconEdit size={20} />} key="edit">
            Edit
          </DropdownItem>
        </DropdownSection>

        <DropdownItem
          startContent={<IconTrash size={20} />}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete Routine
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
