"use client";

import React from "react";
import { usePathname } from 'next/navigation'
import { signOut } from "next-auth/react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { IconDashboard, IconJumpRope, IconList, IconStretching, IconUser, IconActivity, IconLogout } from '@tabler/icons-react';

const NAV_CONTENT_ITEMS = [
    { label: <IconUser className="mt-2" />, href: '/profile' },
    { label: <IconActivity className="mt-2" />, href: '/activity' },
    { label: <IconDashboard className="mt-2" />, href: '/dashboard' },
    { label: <IconJumpRope className="mt-2" />, href: '/workout' },
    { label: <IconStretching className="mt-2" />, href: '/exercises' },
];

export default function MobileNavbar() {
    const pathname = usePathname();

    return (
        <Navbar className="bg-content1 block md:hidden shadow-md">
            <NavbarContent className="gap-5">
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
            </NavbarContent>
        </Navbar>
    );
}
