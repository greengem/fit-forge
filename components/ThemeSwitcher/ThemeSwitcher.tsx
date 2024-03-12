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

  return (
    <>
      {!sidebarCollapse && (
        <div className="flex">
          <button 
            aria-label="Light theme"
            onClick={() => setTheme('light')} 
            className={clsx("dark:hover:bg-zinc-800 hover:bg-zinc-200 p-2 rounded-full", {
              'text-primary': theme === 'light'
            })}
          >
            <IconSunHigh />
          </button>
          <button 
            aria-label="Dark theme"
            onClick={() => setTheme('dark')} 
            className={clsx("dark:hover:bg-zinc-800 hover:bg-zinc-200 p-2 rounded-full", {
              'text-primary': theme === 'dark'
            })}
          >
            <IconMoonStars />
          </button>
          <button 
            aria-label="System theme"
            onClick={() => setTheme('system')} 
            className={clsx("dark:hover:bg-zinc-800 hover:bg-zinc-200 p-2 rounded-full", {
              'text-primary': theme === 'system'
            })}
          >
            <IconDeviceDesktop />
          </button>
        </div>
      )}
    </>
  );
}
