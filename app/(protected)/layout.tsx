import Sidebar from '@/components/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function ProtectedLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <main className="flex flex-col min-h-screen">
            <Toaster />
            <div className='flex flex-grow'>
                <div className="fixed top-0 left-0 h-full w-64 bg-custom-gray">
                    <Sidebar />
                </div>
                <div className="ml-64 flex-1 p-5">
                    {children}
                </div>
            </div>
        </main>
    )
  }