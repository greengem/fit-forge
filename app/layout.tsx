import {Providers} from "./providers";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/SessionProvider";
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
        <SessionProvider session={session}>
          <Providers>
            {children}
          </Providers>
        </SessionProvider>
      </body>
    </html>
  )
}
