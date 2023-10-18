"use client";
import { usePathname } from 'next/navigation'
import Link from "next/link";

export default function SidebarNav() {
    const pathname = usePathname()
    return (
        <ul className='mb-10'>
            <li className={pathname === "/" ? "text-blue-500" : ""}><Link href="/">Home</Link></li>
            <li className={pathname === "/dashboard" ? "text-blue-500" : ""}><Link href="/dashboard">Dashboard</Link></li>
            <li className={pathname === "/workout" ? "text-blue-500" : ""}><Link href="/workout">Start Workout</Link></li>
            <li className={pathname === "/routines" ? "text-blue-500" : ""}><Link href="/routines">Routines</Link></li>
            <li className={pathname === "/exercises" ? "text-blue-500" : ""}><Link href="/exercises">Exercises</Link></li>
        </ul>
    )
}