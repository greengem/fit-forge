"use client";
import { usePathname } from 'next/navigation'
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IconDashboard, IconJumpRope, IconList, IconStretching, IconUser, IconActivity, IconLogout, IconPlus } from '@tabler/icons-react';
import { Button, Divider } from '@nextui-org/react';
import { useSidebarVisibility } from "@/contexts/SidebarContext";

export default function SidebarNav() {
    const pathname = usePathname();
    const { isSidebarVisible, toggleSidebar } = useSidebarVisibility();

    return (
        <ul className="space-y-3 text-sm">
            <Divider />
            <li className='uppercase text-xs text-gray-500 font-bold'>Data</li>
            <NavItem
                icon={<IconDashboard className="h-5 w-5" />}
                label="Dashboard"
                href="/dashboard"
                active={pathname === "/dashboard"}
            />
            <NavItem
                icon={<IconActivity className="h-5 w-5" />}
                label="Activity"
                href="/activity"
                active={pathname === "/activity"}
            />
            <Divider />
            <li className='uppercase text-xs text-gray-500 font-bold'>Workout</li>
            <NavItem
                icon={<IconJumpRope className="h-5 w-5" />}
                label="Start Workout"
                href="/workout"
                active={pathname.startsWith("/workout")}
            />
            <NavItem
                icon={<IconPlus className="h-5 w-5" />}
                label="New Routine"
                href="/routines/new"
                active={pathname.startsWith("/routines/new")}
            />
            <NavItem
                icon={<IconStretching className="h-5 w-5" />}
                label="Browse Exercises"
                href="/exercises"
                active={pathname === "/exercises"}
            />
            <Divider />
            <li className='uppercase text-xs text-gray-500 font-bold'>User</li>
            <NavItem
                icon={<IconUser className="h-5 w-5" />}
                label="Profile"
                href="/profile"
                active={pathname === "/profile"}
            />
            <NavItem
                icon={<IconLogout className="h-5 w-5" />}
                label="Sign Out"
                active={false}
                onClick={() => signOut({ callbackUrl: '/' })}
            />
        </ul>
    );
}

interface NavItemProps {
    icon: JSX.Element;
    label: string;
    href?: string;
    active: boolean;
    onClick?: () => void;
}

function NavItem({ icon, label, href, active, onClick }: NavItemProps) {
    const content = (
        <div className={`flex items-center space-x-3 ${active && 'text-success'} text-foreground`}>
            {icon}
            <div>{label}</div>
        </div>
    );

    return (
        <li>
            {onClick ? (
                <button className='text-left' onClick={onClick}>{content}</button>
            ) : (
                <Link href={href || '#'}>{content}</Link>
            )}
        </li>
    );
}
