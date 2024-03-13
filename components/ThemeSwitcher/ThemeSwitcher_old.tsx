"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useSidebarToggleContext } from "@/contexts/SidebarToggleContext";
import { Switch } from "@nextui-org/switch";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { sidebarCollapse } = useSidebarToggleContext();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  return (
    <>
      {!sidebarCollapse && (
        <Switch
          isSelected={isDarkMode}
          size="lg"
          color="primary"
          aria-label="Toggle theme"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <MoonIcon className={className} />
            ) : (
              <SunIcon className={className} />
            )
          }
          onChange={() => {
            setTheme(isDarkMode ? "light" : "dark");
          }}
        ></Switch>
      )}
    </>
  );
}
