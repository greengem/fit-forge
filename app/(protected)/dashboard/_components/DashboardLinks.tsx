import { Button } from "@nextui-org/button";
import Link from "next/link";
import {
  IconJumpRope,
  IconList,
  IconStretching,
  IconUser,
  IconActivity,
} from "@tabler/icons-react";

export default function DashboardLinks() {
  const links = [
    { href: "/workout", icon: IconJumpRope, label: "Start a Workout" },
    { href: "/workout/routine/new", icon: IconList, label: "Create a Routine" },
    { href: "/exercises", icon: IconStretching, label: "Browse Exercises" },
    { href: "/activity", icon: IconActivity, label: "View Activity" },
    { href: "/profile", icon: IconUser, label: "Edit Profile" },
  ];

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-2 mb-5">
      {links.map((link) => (
        <Button
          color="default"
          variant="flat"
          key={link.href}
          as={Link}
          href={link.href}
          className="gap-unit-1"
        >
          <link.icon size={20} />
          {link.label}
        </Button>
      ))}
    </div>
  );
}
