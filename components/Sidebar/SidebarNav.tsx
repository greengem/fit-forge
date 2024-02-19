'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { IconDashboard, IconJumpRope, IconStretching, IconUser, IconActivity, IconLogout, IconPlus } from '@tabler/icons-react';
import { Divider } from '@nextui-org/divider';

export default function SidebarNav() {
    const pathname = usePathname();

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
                href="/workout/routine/new"
                active={pathname.startsWith("/workout/routine/new")}
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
            <li>
                <SignOutButton><button className='flex items-center gap-3'><IconLogout className='h-5 w-5' />Sign Out</button></SignOutButton>
            </li>
        </ul>
    );
}

interface NavItemProps {
    icon: JSX.Element;
    label?: string;
    href?: string;
    active: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

function NavItem({ icon, label, href, active, onClick, children }: NavItemProps) {
    const content = (
        <div className={`flex items-center space-x-3 ${active && 'text-primary'} text-foreground`}>
            {icon}
            {label && <div>{label}</div>}
        </div>
    );

    return (
        <li>
            {onClick ? (
                <button className='text-left' onClick={onClick}>{content}</button>
            ) : (
                <Link href={href || '#'}>{content}</Link>
            )}
            {children}
        </li>
    );
}