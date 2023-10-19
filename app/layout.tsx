import {Providers} from "./providers";
import Sidebar from '@/components/Sidebar/Sidebar';
import { Toaster } from 'react-hot-toast';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='light'>
      <body>
          <Toaster />
          <Providers>
            <main className="flex flex-col min-h-screen">
              <div className='flex flex-grow'>
                <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
                  <Sidebar />
                </div>
                <div className="ml-64 flex-1 p-5">
                  {children}
                </div>
              </div>
            </main>
          </Providers>
      </body>
    </html>
  )
}
