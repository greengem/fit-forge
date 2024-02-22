"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import {
  IconDashboard,
  IconJumpRope,
  IconStretching,
  IconActivity,
  IconUser,
  IconBook2,
  IconBook,
  IconHelp,
} from "@tabler/icons-react";
import { Divider } from "@nextui-org/divider";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="px-5">
      <ul className="text-sm">
        <li className="uppercase text-xs text-gray-500 font-semibold mb-1 px-2">Data</li>
        <div className="space-y-1 mb-4">
          <NavItem
            icon={<IconDashboard size={22} />}
            label="Dashboard"
            href="/dashboard"
            active={pathname === "/dashboard"}
          />
          <NavItem
            icon={<IconActivity size={22} />}
            label="Activity"
            href="/activity"
            active={pathname === "/activity"}
          />
          <NavItem
            icon={<IconUser size={22} />}
            label="Profile"
            href="/profile"
            active={pathname === "/profile"}
          />
        </div>

        <li className="uppercase text-xs text-gray-500 font-semibold mb-1 px-2">Workout</li>
        <div className="space-y-1 mb-4">
          <NavItem
            icon={<IconJumpRope size={22} />}
            label="Start Workout"
            href="/workout"
            active={pathname.startsWith("/workout")}
          />
          <NavItem
            icon={<IconStretching size={22} />}
            label="Browse Exercises"
            href="/exercises"
            active={pathname === "/exercises"}
          />
        </div>

        <li className="uppercase text-xs text-gray-500 font-semibold mb-1 px-2">More</li>
        <NavItem
          icon={<IconBook size={22} />}
          label="Docs"
          href="/docs"
          active={pathname === "/docs"}
        />
        <NavItem
          icon={<IconHelp size={22} />}
          label="Support"
          href="/support"
          active={pathname === "/support"}
        />
      </ul>
    </div>
  );
}

interface NavItemProps {
  icon: JSX.Element;
  label?: string;
  href?: string;
  active: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

function NavItem({
  icon,
  label,
  href,
  active,
  onClick,
  children,
}: NavItemProps) {
  const content = (
<div
  className={clsx('flex items-center space-x-3 p-2 rounded-lg', active ? 'bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white' : 'text-zinc-600 dark:text-zinc-400')}
>
  {icon}
  {label && <div>{label}</div>}
</div>
);

  return (
    <li>
      {onClick ? (
        <button className="text-left" onClick={onClick}>
          {content}
        </button>
      ) : (
        <Link href={href || "#"}>{content}</Link>
      )}
      {children}
    </li>
  );
}
