import { Avatar } from "@nextui-org/avatar";

export default function ProfileHero({
  userImage,
  username,
}: {
  userImage: string | undefined;
  username: string | undefined;
}) {
  return (
    <div className="hero flex flex-col justify-center items-center pb-5 pt-10">
      <Avatar
        color="primary"
        isBordered
        showFallback
        name={username}
        src={userImage}
        imgProps={{ referrerPolicy: "no-referrer" }}
        className="w-20 h-20 text-large mb-5"
      />
      <h4 className="text-2xl mb-1">{username || "User"}</h4>
      <p className="text-xs text-gray-500">United Kingdom</p>
    </div>
  );
}
