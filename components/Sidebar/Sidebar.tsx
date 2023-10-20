import SidebarNav from './SidebarNav';
import UserDetails from './UserDetails';
import { ThemeSwitcher } from '../ThemeSwitcher';
export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-full w-64 dark:bg-custom-gray hidden md:block">
            <div className='p-3'>
                <SidebarNav />
            </div>

            <div className='absolute bottom-0 left-0 right-0'>
                <ThemeSwitcher />
                <UserDetails />
            </div>
        </div>
    )
}