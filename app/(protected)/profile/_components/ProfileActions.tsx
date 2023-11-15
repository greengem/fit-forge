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
        signOut({ callbackUrl: '/' });
      } else {
        toast.error("An error occurred while trying to delete your account.");
      }
    } catch (error) {
      toast.error("A network error occurred, please try again.");
    }
  }
};


export default function ProfileActions() {
  const router = useRouter();
  
  return (
    <div className='flex gap-x-3'>
      <Button onClick={() => signOut({ callbackUrl: '/'})}>Sign out</Button>
      <Button color="danger" onPress={() => handleDeleteAccount()}>Delete my account and all my data</Button>
    </div>
  )
}
