import { auth } from "@/auth/lucia";
import * as context from "next/headers";
import { User } from "@nextui-org/user";

export default async function SidebarUserInfo() {
    const authRequest = auth.handleRequest("GET", context);
	const session = await authRequest.validate();

    return (
        <div className="p-2">
        <User   
            name={session.user.username}
            description="todo"
            avatarProps={{
                src: session.user.avatar
            }}
        />
        </div>
    )
}
