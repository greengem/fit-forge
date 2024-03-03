"use client";
import { usePathname } from "next/navigation";
import { Navbar, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import NextLink from "next/link";
import { Link } from "@nextui-org/link";
import {
  IconDashboard,
  IconJumpRope,
  IconStretching,
  IconActivity,
  IconBarbell,
} from "@tabler/icons-react";
import NavbarUser from "./NavbarUser";

const NAV_CONTENT_ITEMS = [
  { label: <IconDashboard className="mt-2" />, href: "/dashboard" },
  { label: <IconActivity className="mt-2" />, href: "/activity" },
  { label: <IconJumpRope className="mt-2" />, href: "/workout" },
  { label: <IconStretching className="mt-2" />, href: "/exercises" },
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
            <IconBarbell className="text-primary" /> Tracktive
          </h4>
        </Link>
      </NavbarContent>

      <NavbarContent className="gap-5" justify="center">
        {NAV_CONTENT_ITEMS.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <Link as={NextLink} color="foreground" href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent> */}

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
