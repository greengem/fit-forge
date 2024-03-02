"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WorkoutControlsProvider } from "@/contexts/WorkoutControlsContext";
import { WorkoutDataProvider } from "@/contexts/WorkoutDataContext";
import { ExerciseDetailModalProvider } from "@/contexts/ExerciseDetailModalContext";
import { SidebarToggleProvider } from "@/contexts/SidebarToggleContext";
import { ConfettiProvider } from "@/contexts/ConfettiContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="flex flex-col grow">
      <NextThemesProvider
        attribute="class"
        defaultTheme="dark"
        themes={["light", "dark"]}
      >
        <WorkoutControlsProvider>
          <WorkoutDataProvider>
              <ExerciseDetailModalProvider>
                <SidebarToggleProvider>
                  <ConfettiProvider>
                    {children}
                  </ConfettiProvider>
                </SidebarToggleProvider>
              </ExerciseDetailModalProvider>
          </WorkoutDataProvider>
        </WorkoutControlsProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
