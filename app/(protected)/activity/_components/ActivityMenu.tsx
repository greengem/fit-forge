"use client";
import { useContext } from "react";
import { ActivityModalContext } from "@/contexts/ActivityModalContext";
import { handleDeleteActivity } from "@/server-actions/ActivityServerActions";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import {
  IconEdit,
  IconInfoCircle,
  IconMenu2,
  IconTrash,
} from "@tabler/icons-react";
import { toast } from "sonner";

interface Set {
  weight: number | null;
  reps: number | null;
  exerciseDuration: number | null;
}

interface Exercise {
  id: string;
  exerciseId: string;
  Exercise: {
    name: string;
  };
  sets: Set[];
}

interface Activity {
  id: string;
  name: string;
  duration: number;
  createdAt: Date;
  exercises: Exercise[];
}

export default function ActivityMenu({ activity }: { activity: Activity }) {
  const { setActivity, onOpen } = useContext(ActivityModalContext);

  const handleDelete = async (activityId: string) => {
    const response = await handleDeleteActivity(activityId);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const handleAction = (key: string, activity: Activity) => {
    if (key === "delete") {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this activity?",
      );
      if (confirmDelete) {
        handleDelete(activity.id);
      }
    } else if (key === "details") {
      setActivity(activity);
      onOpen();
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <button className="shrink-0">
          <IconMenu2 size={22} />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        disabledKeys={["edit"]}
        aria-label="Static Actions"
        topContent={
          <h4 className="text-zinc-500 uppercase font-semibold text-xs px-2 pt-2">
            Activity Actions
          </h4>
        }
        onAction={(key) => handleAction(String(key), activity)}
      >
        <DropdownSection showDivider>
          <DropdownItem
            startContent={<IconInfoCircle size={20} />}
            key="details"
          >
            View Details
          </DropdownItem>
          <DropdownItem startContent={<IconEdit size={20} />} key="edit">
            Edit (Coming soon)
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          startContent={<IconTrash size={20} />}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Delete Activity
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
