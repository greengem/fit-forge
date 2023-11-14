"use client";
import SidebarNav from './SidebarNav';
import SidebarBrand from './SidebarBrand';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import SidebarWorkoutControls from './SidebarWorkoutControls';
import { useSidebarVisibility } from "@/contexts/SidebarContext";

export default function Sidebar() {
    const { isSidebarVisible, toggleSidebar } = useSidebarVisibility();

    return (
        <aside className="flex-none overflow-hidden bg-white dark:bg-content1 shadow-md">

            <div className='px-3 pt-3'>
                <SidebarNav />
            </div>
            <SidebarWorkoutControls />

            <div className='absolute bottom-0 left-0 right-0'>
                <div className="py-5 flex flex-col items-center justify-center">
                    <ThemeSwitcher />
                    <p className="text-xs mr-2 text-gray-500 mt-2">Theme Switcher</p>
                </div>
            </div>
        </aside>
    )
}
