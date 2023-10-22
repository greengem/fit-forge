import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageHeading from '@/components/PageHeading/PageHeading';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <PageHeading title="Profile" />
            <p>Logged in as {session.user.name}</p>
        </>
  )
}
