import SidebarNav from './SidebarNav';
import SidebarUserInfo from './SidebarUserInfo';

export default function Sidebar() {
    return (
        <>
            <div>
                <div className='p-2'>
                    <SidebarNav />
                </div>
                <div className='absolute bottom-0 left-0 right-0'>
                    <SidebarUserInfo />
                </div>
            </div>
        </>
    )
}