import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs";
import { setRole } from "./_actions";

import PageHeading from "@/components/PageHeading/PageHeading";
import { User } from "@nextui-org/user";

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
      <p className="mb-3">This page is restricted to users with the 'admin' role.</p>
 
      <SearchUsers />
 
      {users.map((user) => {
        return (
          <div key={user.id} className="flex justify-between">
            <User   
                name={`${user.firstName} ${user.lastName}`}
                description=              {
                  user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                  )?.emailAddress
                }
                avatarProps={{
                  src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
                }}
              />
            <div>{user.publicMetadata.role as string}</div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button type="submit">Make Admin</button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button type="submit">Make Moderator</button>
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
}