"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { Link } from '@nextui-org/react';

// Main Sidebar
export function DynamicSidebar({ children }) {
    return (
        <div className="dynamic-sidebar bg-content1">
            {children}
        </div>
    );
}

// Menu
export function Menu({ children }) {
    return (
        <ul className="menu">
            {children}
        </ul>
    );
}

// Menu Item
export function MenuItem({ children, icon, href, color = 'foreground' }) {
    const currentPath = usePathname();

    return (
        <li>
            <Link as={NextLink} color={color} href={href} className={`menu-item w-full ${currentPath === href ? 'text-success' : ''}`}>
                <div className="flex items-center space-x-3 px-7 py-2">
                    <span>{icon}</span>
                    <span>{children}</span>
                </div>
            </Link>
        </li>
    );
}
