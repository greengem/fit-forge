import { Divider } from '@nextui-org/divider';
import SidebarNav from './SidebarNav';
import SidebarBrand from './SidebarBrand';
//import UserDetails from './UserDetails';
import { ThemeSwitcher } from '@/components/ThemeSwitcher/ThemeSwitcher';

export default function Sidebar() {
    return (
        <div className="fixed top-0 left-0 h-full w-64 bg-white dark:bg-content1 hidden md:block">
            <div>
                <SidebarBrand />
            </div>
            <div className='p-3'>
                <SidebarNav />
            </div>

            <div className='absolute bottom-0 left-0 right-0'>
                <Divider />
                <ThemeSwitcher />
            </div>
        </div>
    )
}
