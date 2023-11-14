"use client";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WorkoutControlsProvider } from '@/contexts/WorkoutControlsContext';
import { WorkoutDataProvider } from '@/contexts/WorkoutDataContext';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
          <WorkoutControlsProvider>
            <WorkoutDataProvider>
              {children}
            </WorkoutDataProvider>
          </WorkoutControlsProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
