"use client";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WorkoutControlsProvider } from '@/contexts/WorkoutControlsContext';
import { WorkoutDataProvider } from '@/contexts/WorkoutDataContext';
import { SidebarProvider } from '@/contexts/SidebarContext'

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="dark"
        themes={[
          'light', 'dark', 
          'light-cyan', 'dark-cyan',
          'light-hot-pink', 'dark-hot-pink', 
          'light-bright-orange', 'dark-bright-orange'
        ]}
      >
          <WorkoutControlsProvider>
            <WorkoutDataProvider>
              <SidebarProvider>
                {children}
              </SidebarProvider>
            </WorkoutDataProvider>
          </WorkoutControlsProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
