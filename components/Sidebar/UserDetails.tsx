"use client";
import { useSession } from "next-auth/react";
import {User} from "@nextui-org/user";

export default function UserDetails() {
    const { data: session } = useSession();
    return (
        <div className="px-4 pt-4 pb-3">
            <User   
                name={session?.user?.name}
                description="Signed in"
                avatarProps={{
                    src: session?.user?.image ?? ''
                }}
            />
        </div>
    )
}
