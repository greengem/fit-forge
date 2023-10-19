import {Providers} from "./providers";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
import Sidebar from '@/components/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();

  return (
    <html lang="en" className='dark'>
      <body>
          <Toaster />
          <SessionProvider session={session}>
          <Providers>
            <main className="flex flex-col min-h-screen">
              <div className='flex flex-grow'>
                <div className="fixed top-0 left-0 h-full w-64 bg-custom-gray">
                  <Sidebar />
                </div>
                <div className="ml-64 flex-1 p-5">
                  {children}
                </div>
              </div>
            </main>
          </Providers>
          </SessionProvider>
      </body>
    </html>
  )
}
