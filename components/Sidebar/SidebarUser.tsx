import { currentUser } from "@clerk/nextjs";
import { Divider } from "@nextui-org/react";
import { User } from "@nextui-org/user";

export default async function SidebarUser() {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to view this page.");
  }
  const username = user?.username || undefined;
  const userImage = user?.imageUrl;

  return (
    <div className="px-5 mb-3">
      <User
        name={username}
        description="Standard Plan"
        avatarProps={{
          src: userImage,
        }}
        classNames={{
          description: "text-gray-500",
        }}
      />
    </div>
  );
}
