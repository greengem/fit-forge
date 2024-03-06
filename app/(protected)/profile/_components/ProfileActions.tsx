"use client";
import { useClerk } from "@clerk/clerk-react";
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/button";
import { IconLogout } from "@tabler/icons-react";

export default function ProfileActions() {
  const { signOut } = useClerk();
  const router = useRouter()

  return (
    <div>
      <Button color="danger" variant="flat" onClick={() => signOut(() => router.push("/"))}>
        <IconLogout /> Sign out
      </Button>
    </div>
  );
}