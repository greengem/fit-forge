import SidebarNav from "./SidebarNav";
import SidebarBrand from "./SidebarBrand";
import { ThemeSwitcher } from "@/components/ThemeSwitcher/ThemeSwitcher";
import SidebarWorkoutControls from "./SidebarWorkoutControls";
import SidebarUser from "./SidebarUser";
import SidebarSearch from "./SidebarSearch";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 dark:bg-zinc-900 hidden md:block shadow-md">
      <SidebarBrand />
      <SidebarUser />
      {/* <SidebarSearch /> */}
      <SidebarNav />
      <SidebarWorkoutControls />

      <div>
        <div className="absolute bottom-0 left-0 right-0 py-5 flex flex-col items-center justify-center group-light-bg-1 group-dark-bg-1">
          <ThemeSwitcher />
        </div>
      </div>
    </aside>
  );
}
