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
  { label: <IconDashboard />, href: "/dashboard" },
  { label: <IconActivity />, href: "/activity" },
  { label: <IconJumpRope />, href: "/workout" },
  { label: <IconBook />, href: "/exercises" },
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
        <Link href="/" className="text-white">
          <h4 className="flex items-center text-lg gap-2 font-semibold tracking-tight">
            <IconFlame className="text-primary" />
          </h4>
        </Link>
      </NavbarContent>

      <NavbarContent className="gap-5" justify="center">
        {NAV_CONTENT_ITEMS.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link href={item.href}>{item.label}</Link>
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
