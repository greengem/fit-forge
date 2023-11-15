import {Providers} from "./providers";
import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { Inter } from 'next/font/google'
import './globals.css';
import { Toaster } from 'react-hot-toast';

export function generateViewport() {
  return {
    themeColor: '#18181b',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: 'no'
  };
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  
  title: 'Tracktive: Log, Analyze, and Optimize Your Workouts',
  description: 'Take Control of Your Fitness Goals with Tracktive. The intuitive workout tracking web app designed to optimize your gym sessions and improve your results.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
