import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

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
                    {children}
                </div>
            </div>
        </main>
    )
  }