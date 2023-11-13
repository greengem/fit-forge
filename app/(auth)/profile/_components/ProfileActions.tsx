"use client";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import { signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";

const handleDeleteAccount = async () => {
  if (window.confirm("Are you sure you want to delete your account? This can't be undone.")) {
    try {
        const res = await fetch(`/api/users/`, {
        method: 'DELETE',
      });
      if (res.ok) {
        toast.success("Account and data deleted successfully");
        signOut({ callbackUrl: '/' })
      } else {
        console.error("An error occurred:", await res.text());
      }
    } catch (error) {
      console.error("An error occurred while deleting the account:", error);
    }
  }
};

export default function ProfileActions() {
    const router = useRouter();
    return <Button color="danger" onClick={() => handleDeleteAccount()}>Delete my account and all my data</Button>;
}
