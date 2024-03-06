import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs";
import { setRole } from "./_actions";

import PageHeading from "@/components/PageHeading/PageHeading";
import { User } from "@nextui-org/user";
import { Button } from "@nextui-org/button";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const users = query ? await clerkClient.users.getUserList({ query }) : [];

  return (
    <>
      <PageHeading title="Admin Dashboard" />
      <p className="mb-3">
        This page is restricted to users with the &apos;admin&apos; role.
      </p>

      <SearchUsers />

      <ul className="space-y-3">
        {users.map((user) => {
          const role = user.publicMetadata.role as string;
          const userString = role
            ? `${user.firstName} ${user.lastName} (${role})`
            : `${user.firstName} ${user.lastName}`;

          return (
            <li key={user.id} className="flex justify-between">
              <User
                name={userString}
                description={
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId,
                  )?.emailAddress
                }
                avatarProps={{
                  src: user.imageUrl,
                }}
                classNames={{ description: "text-zinc-500" }}
              />
              <div className="flex gap-3">
                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="admin" name="role" />
                  <Button type="submit" size="sm">
                    Make Admin
                  </Button>
                </form>

                <form action={setRole}>
                  <input type="hidden" value={user.id} name="id" />
                  <input type="hidden" value="moderator" name="role" />
                  <Button type="submit" size="sm">
                    Make Moderator
                  </Button>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
