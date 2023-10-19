import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import Form from "@/components/form";

import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";
import Link from "next/link";

export default async function SidebarUserInfo() {
    const authRequest = auth.handleRequest("GET", context);
    const session = await authRequest.validate();
    
    return (
        <div className="border-t-2 p-5 border-gray-800">
        {
            session
            ? (
                <>
                <User   
                    name={session.user.githubUsername}
                    description="Logged in"
                    avatarProps
                    className="mb-5"
                />
                <Form action="/api/logout">
                    <Button type="submit" className="w-full">Sign out</Button>
                </Form>
            </>
              )
            : (
                <Button className="w-full">
                    <Link href="/login/github">Sign in with GitHub</Link>
                </Button>
              )
        }
        </div>
    );
}
