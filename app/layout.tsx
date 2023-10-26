import {Providers} from "./providers";
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  
  title: 'Tracktive: Log, Analyze, and Optimize Your Workouts',
  description: 'Take Control of Your Fitness Goals with Tracktive. The intuitive workout tracking web app designed to optimize your gym sessions and improve your results.',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  themeColor: '#18181b',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
