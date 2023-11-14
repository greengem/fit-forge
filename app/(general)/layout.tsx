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
      <main className="flex h-screen">
      <Toaster />
          <Sidebar />
          <div className="flex-grow h-screen">
              <Navbar />
              <ActiveWorkoutWarning />
              <div className='p-6'>
                {children}
              </div>
          </div>
  </main>
    )
  }
