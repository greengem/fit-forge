"use client";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { IconLogout } from "@tabler/icons-react";

export default function ProfileActions() {
  return (
    <SignOutButton>
      <Button>
        <IconLogout /> Sign out
      </Button>
    </SignOutButton>
  );
}
