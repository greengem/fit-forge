"use client";
import { useSidebarToggleContext } from "@/contexts/SidebarToggleContext";
import { User } from "@nextui-org/user";
import { Avatar } from "@nextui-org/avatar";

export default function SidebarUser({
  username,
  userImage,
}: {
  username?: string;
  userImage?: string;
}) {
  const { sidebarCollapse } = useSidebarToggleContext();

  return (
    <div className="px-5 mb-3">
      {!sidebarCollapse && (
        <User
          name={username || "Unknown"}
          description="Standard Plan"
          avatarProps={{
            src: userImage || "default-image-url",
          }}
          classNames={{
            description: "text-zinc-600 dark:text-zinc-400",
          }}
        />
      )}

      {sidebarCollapse && (
        <div className="flex justify-center">
          <Avatar
            showFallback
            name={username || "Unknown"}
            src={userImage || "default-image-url"}
          />
        </div>
      )}
    </div>
  );
}
