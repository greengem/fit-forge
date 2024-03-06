import { Avatar } from "@nextui-org/avatar";

export default function ProfileHero({
  userImage,
  username,
}: {
  userImage: string | undefined;
  username: string | undefined;
}) {
  return (
    <div className="hero flex flex-col justify-center items-center mb-3 pt-10">
      <Avatar
        color="primary"
        isBordered
        showFallback
        name={username}
        src={userImage}
        imgProps={{ referrerPolicy: "no-referrer" }}
        className="w-20 h-20 text-large mb-5"
      />
      <h4 className="text-4xl mb-3">{username || "User"}</h4>
    </div>
  );
}
