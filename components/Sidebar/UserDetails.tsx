import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {User} from "@nextui-org/user";

export default async function UserDetails() {
    const session = await getServerSession(authOptions);
    return (
        <div className="px-4 pt-4 pb-3">
            <User   
                name={session?.user?.name}
                description="Signed in"
                avatarProps={{
                    src: session?.user?.image
                }}
            />
        </div>
    )
}