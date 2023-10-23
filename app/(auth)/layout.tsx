import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import { authOptions } from "@/utils/authOptions"
import Sidebar from '@/components/Sidebar/Sidebar';
import Navbar from '@/components/Navbar/Navbar';
import { Toaster } from 'react-hot-toast';

export default async function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const session = await getServerSession(authOptions);

    return (
      <SessionProvider session={session}>
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
      </SessionProvider>
    )
  }