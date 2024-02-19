"use client";
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { WorkoutControlsProvider } from '@/contexts/WorkoutControlsContext';
import { WorkoutDataProvider } from '@/contexts/WorkoutDataContext';
import { ActivityModalProvider } from '@/contexts/ActivityModalContext';
import { ExerciseDetailModalProvider } from '@/contexts/ExerciseDetailModalContext';
import { ExerciseAddToRoutineModalProvider } from '@/contexts/ExerciseAddToRoutineModalContext';
import { ModalProvider } from '@/contexts/ModalContext';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider className='flex flex-col grow'>
      <NextThemesProvider 
        attribute="class" 
        defaultTheme="dark"
        themes={['light', 'dark']}
      >
          <WorkoutControlsProvider>
            <WorkoutDataProvider>
              <ActivityModalProvider>
                <ExerciseDetailModalProvider>
                  <ExerciseAddToRoutineModalProvider>
                    <ModalProvider>
                      {children}
                    </ModalProvider>
                  </ExerciseAddToRoutineModalProvider>
                </ExerciseDetailModalProvider>
              </ActivityModalProvider>
            </WorkoutDataProvider>
          </WorkoutControlsProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
