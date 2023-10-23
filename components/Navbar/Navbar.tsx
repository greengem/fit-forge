"use client";

import React from "react";
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";

const NAV_ITEMS = [
    { label: 'Profile', href: '/profile' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Activity', href: '/activity' },
    { label: 'Start a Workout', href: '/workout' },
    { label: 'Routines', href: '/routines' },
    { label: 'Exercises', href: '/exercises' }
];

const NAV_CONTENT_ITEMS = [
    { label: 'Profile', href: '/profile' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Workout', href: '/workout' },
    { label: 'Routines', href: '/routines' },
];

export default function MobileNavbar() {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-content1 block md:hidden">
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit text-success">Tracktive</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                {NAV_CONTENT_ITEMS.map(item => (
                    <NavbarItem key={item.href} isActive={pathname === item.href}>
                        <Link as={NextLink} color="foreground" href={item.href}>
                            {item.label}
                        </Link>
                    </NavbarItem>
                ))}
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <ThemeSwitcher />
                </NavbarItem>
                <NavbarItem>
                    <Button onClick={() => signOut({ callbackUrl: '/' })} color="success" href="#" variant="flat">Sign Out</Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {NAV_ITEMS.map(item => (
                    <NavbarMenuItem key={item.href}>
                        <Link color="foreground" href={item.href} className="w-full" size="lg">
                            {item.label}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}
