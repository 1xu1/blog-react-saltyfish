import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react';
import WebsiteCounter from '@/components/WebsiteCounter/index'
import { SpeedInsights } from "@vercel/speed-insights/next"
import NprogressProvider from "@/components/NprogressProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: process.env.APP_TITTLE,
  description: process.env.APP_DESCRIPTION,
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <NprogressProvider>
          {children}
        </NprogressProvider>
        <Analytics />
        <WebsiteCounter id={0} />
        <SpeedInsights />
      </body>
    </html>
  )
}
