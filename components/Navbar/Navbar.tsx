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
    { label: <IconUser />, href: '/profile' },
    { label: <IconActivity />, href: '/activity' },
    { label: <IconDashboard />, href: '/dashboard' },
    { label: <IconJumpRope />, href: '/workout' },
    { label: <IconList />, href: '/routines' },
    { label: <IconStretching />, href: '/exercises' },
];

export default function MobileNavbar() {
    const pathname = usePathname();

    return (
        <Navbar className="bg-content1 block md:hidden shadow-md">
            <NavbarContent>
                <NavbarBrand>
                    <Link as={NextLink} href="/dashboard">
                        <p className="font-bold text-inherit text-success">Tracktive</p>
                    </Link>
                </NavbarBrand>
            </NavbarContent>

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
