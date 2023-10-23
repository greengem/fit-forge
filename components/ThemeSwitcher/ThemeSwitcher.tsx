"use client";

import React from "react";
import { Switch } from "@nextui-org/react";
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
    <div className="py-5 flex flex-col items-center justify-center">
      
      <Switch
        className="mb-3"
        isSelected={isDarkMode}
        size="lg"
        color="success"
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
      <p className="text-xs mr-2 text-gray-500">Theme Switcher</p>
    </div>
  );
}
