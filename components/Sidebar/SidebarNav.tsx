"use client";
import { usePathname } from 'next/navigation'
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { IconDashboard, IconJumpRope, IconList, IconStretching, IconUser, IconActivity, IconLogout } from '@tabler/icons-react';
import { Button, Divider } from '@nextui-org/react';

export default function SidebarNav() {
    const pathname = usePathname();

    return (
        <ul className="space-y-2">
            <NavItem
                icon={<IconUser className="h-6 w-6" />}
                label="Profile"
                href="/profile"
                active={pathname === "/profile"}
            />
            <NavItem
                icon={<IconDashboard className="h-6 w-6" />}
                label="Dashboard"
                href="/dashboard"
                active={pathname === "/dashboard"}
            />
            <NavItem
                icon={<IconActivity className="h-6 w-6" />}
                label="Activity"
                href="/activity"
                active={pathname === "/activity"}
            />
            <Divider />
            <NavItem
                icon={<IconJumpRope className="h-7 w-7" />}
                label="Start Workout"
                href="/workout"
                active={pathname.startsWith("/workout")}
            />
            <NavItem
                icon={<IconList className="h-7 w-7" />}
                label="Manage Routines"
                href="/routines"
                active={pathname.startsWith("/routines")}
            />
            <NavItem
                icon={<IconStretching className="h-7 w-7" />}
                label="Browse Exercises"
                href="/exercises"
                active={pathname === "/exercises"}
            />
            <Divider />
            <NavItem
                icon={<IconLogout className="h-7 w-7" />}
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
            <div>
                <div>{label}</div>
            </div>
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
