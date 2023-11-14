import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';
import ActiveWorkoutWarning from '@/components/Notices/ActiveWorkoutWarning';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
        <main className="flex flex-col min-h-screen">
            <Toaster />
            <Navbar />
            <div className='flex flex-grow'>
                <Sidebar />
                <div className="md:ml-64 flex-1 p-5">
                    <ActiveWorkoutWarning />
                    {children}
                </div>
            </div>
        </main>
    )
  }