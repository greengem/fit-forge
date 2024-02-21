"use client";
import { SignOutButton } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";

export default function ProfileActions() {
  return (
    <SignOutButton>
      <Button>Sign out</Button>
    </SignOutButton>
  );
}
