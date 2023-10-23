"use client";
import { usePathname } from 'next/navigation'
import Link from "next/link";

const NAVBAR_ITEMS = [
    {
        label: "Profile",
        href: "/profile",
    },
    {
        label: "Dashboard",
        href: "/dashboard",
    },
    {
        label: "Workout",
        href: "/workout",
    },
    {
        label: "Routines",
        href: "/routines",
    },
    {
        label: "Exercises",
        href: "/exercises",
    }
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <div className="px-5 py-4 bg-white dark:bg-content1 block md:hidden shadow-md">
            <ul className="flex space-x-2">
                {NAVBAR_ITEMS.map(item => (
                    <NavbarItem
                        key={item.href}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}
            </ul>
        </div>
    );
}

interface NavbarItemProps {
    label: string;
    href: string;
    active: boolean;
}

function NavbarItem({ label, href, active }: NavbarItemProps) {
    return (
        <li className={`${active ? 'text-success' : 'text-foreground'}`}>
            <Link href={href}>
                {label}
            </Link>
        </li>
    );
}
