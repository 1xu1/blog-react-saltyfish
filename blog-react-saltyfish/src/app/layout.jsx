import './globals.css'
import { Inter } from 'next/font/google'
import { addWebSiteRead } from '@/db/sql'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: process.env.APP_TITTLE,
  description: process.env.APP_DESCRIPTION,
}

export default function RootLayout({ children }) {
  addWebSiteRead()
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
