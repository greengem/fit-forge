"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useTheme } from "next-themes";
import { useSidebarToggleContext } from "@/contexts/SidebarToggleContext";
import { IconDeviceDesktop, IconMoonStars, IconSunHigh } from "@tabler/icons-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { sidebarCollapse } = useSidebarToggleContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { name: 'light', icon: <IconSunHigh size={20} />, label: 'Light theme' },
    { name: 'dark', icon: <IconMoonStars size={20} />, label: 'Dark theme' },
    { name: 'system', icon: <IconDeviceDesktop size={20} />, label: 'System theme' },
  ];

  return (
    <>
      {!sidebarCollapse && (
        <div className="flex gap-1">
          {themes.map(({ name, icon, label }) => (
            <button 
              key={name}
              aria-label={label}
              onClick={() => setTheme(name)} 
              className={clsx("dark:hover:bg-zinc-800 hover:bg-zinc-200 p-2 rounded-full", {
                'text-black dark:text-primary bg-primary dark:bg-zinc-800': theme === name
              })}
            >
              {icon}
            </button>
          ))}
        </div>
      )}
    </>
  );
}