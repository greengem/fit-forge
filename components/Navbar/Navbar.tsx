import { currentUser } from "@clerk/nextjs";
import MobileNavbarClient from "./Navbar.client";
export default async function MobileNavbar() {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to view this page.");
  }

  const username = user?.username || undefined;
  const userImage = user?.imageUrl || undefined;

  return <MobileNavbarClient username={username} userImage={userImage} />;
}
