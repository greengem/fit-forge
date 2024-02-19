"use client";

import React from "react";
import { Switch } from "@nextui-org/switch";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  return (    
      <Switch
        isSelected={isDarkMode}
        size="lg"
        color="primary"
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
      >
      </Switch>
  );
}
