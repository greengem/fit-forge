import { currentUser } from "@clerk/nextjs";
import SidebarNav from "./SidebarNav";
import SidebarBrand from "./SidebarBrand";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import SidebarWorkoutControls from "./SidebarWorkoutControls";
import SidebarUser from "./SidebarUser";
import SidebarSearch from "./SidebarSearch";
import SidebarSocials from "./SidebarSocials";
import SidebarWrapper from "./SidebarWrapper.client";

export default async function Sidebar() {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to view this page.");
  }

  const username = user?.username || undefined;
  const userImage = user?.imageUrl;

  return (
    <SidebarWrapper>
      <SidebarBrand />
      <SidebarUser username={username} userImage={userImage} />
      {/* <SidebarSearch /> */}
      <SidebarNav />
      <SidebarWorkoutControls />
      <div className="absolute bottom-0 left-0 right-0 py-5 px-5 flex flex-col items-center">
        <ThemeSwitcher />
        {/* <SidebarSocials /> */}
      </div>
    </SidebarWrapper>
  );
}
