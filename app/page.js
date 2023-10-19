import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageHeading from '@/components/PageHeading/PageHeading';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  return (
    <>
    <PageHeading title="Landing Page" />
    <p>name {session?.user?.name}</p>
    <p>email {session?.user?.email}</p>
    <p>image {session?.user?.image}</p>
    <p>id {session?.user?.id}</p>
    <p>userId {session?.user?.userId}</p>
    </>
  )
}
