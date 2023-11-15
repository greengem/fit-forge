"use client";
import SidebarNav from './SidebarNav';
import SidebarBrand from './SidebarBrand';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import SidebarWorkoutControls from './SidebarWorkoutControls';
import { useSidebarVisibility } from "@/contexts/SidebarContext";
import { Divider } from '@nextui-org/react';

export default function Sidebar() {
    const { isSidebarVisible, toggleSidebar, isSlim, toggleSlim } = useSidebarVisibility();

    return (
        <aside className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-content1 hidden md:block shadow-md">
            <div>
                <SidebarBrand />
            </div>
            <div className='px-5 pt-3 mb-2'>
                <SidebarNav />
            </div>
            <SidebarWorkoutControls />

            <div>
                <div className="absolute bottom-0 left-0 right-0 py-5 flex flex-col items-center justify-center bg-white dark:bg-content1">
                    <ThemeSwitcher />
                    <p className="text-xs mr-2 text-gray-500 mt-2">Theme Switcher</p>
                </div>
            </div>
        </aside>
    )
}
