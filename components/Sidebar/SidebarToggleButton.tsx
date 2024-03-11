"use client";
import { useSidebarToggleContext } from "@/contexts/SidebarToggleContext";
import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
} from "@tabler/icons-react";

export default function SidebarToggleButton() {
  const { sidebarCollapse, toggleSidebar } = useSidebarToggleContext();
  return (
    <li onClick={toggleSidebar} className="cursor-pointer">
      <div className="flex items-center space-x-3 p-2 rounded-lg text-zinc-600 dark:text-zinc-400">
        {sidebarCollapse ? (
          <IconLayoutSidebarLeftExpand size={22} className="shrink-0" />
        ) : (
          <IconLayoutSidebarLeftCollapse size={22} className="shrink-0" />
        )}
        {!sidebarCollapse && <div>Collapse Sidebar</div>}
      </div>
    </li>
  );
}
