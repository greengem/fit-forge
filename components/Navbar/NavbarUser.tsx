import { Avatar } from "@nextui-org/avatar";
export default function NavbarUser({
  username,
  userImage,
}: {
  username: string | undefined;
  userImage: string | undefined;
}) {
  return (
    <Avatar
      showFallback
      isBordered
      color="primary"
      size="sm"
      name={username || "User"}
      src={userImage || undefined}
    />
  );
}
