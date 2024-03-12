"use client";
import { useSidebarToggleContext } from "@/contexts/SidebarToggleContext";
import clsx from "clsx";

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarCollapse, toggleSidebar } = useSidebarToggleContext();

  const sidebarClass = clsx({
    "fixed top-0 left-0 h-full bg-white dark:bg-zinc-900 hidden md:block shadow-md overflow-hidden":
      true,
    "w-20 sidebar-collapsed": sidebarCollapse,
    "w-64 sidebar-expanded": !sidebarCollapse,
  });

  return <aside className={sidebarClass}>{children}</aside>;
}
