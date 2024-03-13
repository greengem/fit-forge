"use client";
import { usePathname } from "next/navigation";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import Link from "next/link";
import {
  IconDashboard,
  IconJumpRope,
  IconBook,
  IconActivity,
  IconFlame,
} from "@tabler/icons-react";
import NavbarUser from "./NavbarUser";

const NAV_CONTENT_ITEMS = [
  { icon: <IconDashboard />, href: "/dashboard", label: "Dashboard" },
  { icon: <IconActivity />, href: "/activity", label: "Activity Log"},
  { icon: <IconJumpRope />, href: "/workout", label: "Start Workout"},
  { icon: <IconBook />, href: "/exercises", label: "Exercises"},
];

export default function MobileNavbarClient({
  username,
  userImage,
}: {
  username: string | undefined;
  userImage: string | undefined;
}) {
  const pathname = usePathname();

  return (
    <Navbar className="bg-content1 block md:hidden shadow-md">

      <NavbarContent justify="start">
        <NavbarItem>
          <Link href="/" className="text-lg font-semibold tracking-tight" aria-label="Home Page">
            <IconFlame className="text-primary" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="gap-5" justify="center">
        {NAV_CONTENT_ITEMS.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link href={item.href} aria-label={item.label}>{item.icon}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Link href="/profile">
            <NavbarUser username={username} userImage={userImage} />
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
