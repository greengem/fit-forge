"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";
import { useSidebarToggleContext } from '@/contexts/SidebarToggleContext';

import {
  IconDashboard,
  IconJumpRope,
  IconStretching,
  IconActivity,
  IconUser,
  IconBook,
  IconHelp,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";
import SidebarToggleButton from "./SidebarToggleButton";

export default function SidebarNav() {
  const { sidebarCollapse, toggleSidebar } = useSidebarToggleContext();
  const pathname = usePathname();

  return (
    <div className="px-5">
      <ul className="text-sm">
      {!sidebarCollapse && <li className="uppercase text-xs text-gray-500 font-semibold mb-1 px-2">Data</li>}
        <div className="space-y-1 mb-4">
          <NavItem
            icon={<IconDashboard size={22} className="shrink-0" />}
            label="Dashboard"
            href="/dashboard"
            active={pathname === "/dashboard"}
          />
          <NavItem
            icon={<IconActivity size={22} className="shrink-0" />}
            label="Activity"
            href="/activity"
            active={pathname === "/activity"}
          />
          <NavItem
            icon={<IconUser size={22} className="shrink-0" />}
            label="Profile"
            href="/profile"
            active={pathname === "/profile"}
          />
        </div>

        {!sidebarCollapse && <li className="uppercase text-xs text-gray-500 font-semibold mb-1 px-2">Workout</li>}
        <div className="space-y-1 mb-4">
          <NavItem
            icon={<IconJumpRope size={22} className="shrink-0" />}
            label="Start Workout"
            href="/workout"
            active={pathname.startsWith("/workout")}
          />
          <NavItem
            icon={<IconStretching size={22} className="shrink-0" />}
            label="Browse Exercises"
            href="/exercises"
            active={pathname === "/exercises"}
          />
        </div>

        {!sidebarCollapse && <li className="uppercase text-xs text-gray-500 font-semibold mb-1 px-2">More</li>}
        <NavItem
          icon={<IconBook size={22} className="shrink-0" />}
          label="Docs"
          href="/docs"
          active={pathname === "/docs"}
        />
        <NavItem
          icon={<IconHelp size={22} className="shrink-0" />}
          label="Support"
          href="/support"
          active={pathname === "/support"}
        />
        <li onClick={toggleSidebar} className='cursor-pointer'>
          <div className={clsx(
            "flex items-center space-x-3 p-2 rounded-lg text-zinc-600 dark:text-zinc-400",
            sidebarCollapse ? "justify-center" : ""
          )}>
            {sidebarCollapse ? 
                <IconLayoutSidebarLeftExpand size={22} className='shrink-0' /> :
                <IconLayoutSidebarLeftCollapse size={22} className='shrink-0' />
            }
            {!sidebarCollapse && <div>Collapse Sidebar</div>}
          </div>
        </li>
      </ul>
    </div>
  );
}

interface NavItemProps {
  icon: JSX.Element;
  label?: string;
  href?: string;
  active: boolean;
  children?: React.ReactNode;
}

function NavItem({
  icon,
  label,
  href,
  active,
  children,
}: NavItemProps) {
  const { sidebarCollapse } = useSidebarToggleContext();

  const content = (
    <div
      className={clsx(
        "flex items-center space-x-3 p-2 rounded-lg",
        sidebarCollapse ? "justify-center" : "",
        active
          ? "bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white"
          : "text-zinc-600 dark:text-zinc-400",
      )}
    >
      {icon}
      {!sidebarCollapse && label && <div>{label}</div>}
    </div>
  );

  return (
    <li>
      <Link href={href || "#"}>{content}</Link>
      {children}
    </li>
  );
}
