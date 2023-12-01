import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import ActiveWorkoutWarning from '@/components/Notices/ActiveWorkoutWarning';

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <div className="flex">
          <Sidebar />
          <main className="flex-grow w-full">
            <Navbar />
            <div className='p-3 md:p-5 ml-0 md:ml-64'>
              <ActiveWorkoutWarning />
              {children}
            </div>
          </main>
        </div>
    )
  }