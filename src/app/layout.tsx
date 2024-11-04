import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Auth0Provider from '@/components/providers/Auth0Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'H1B Career Advisor',
  description: 'Your AI-powered career advisor for H1B sponsorship and job search',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Auth0Provider>
          {children}
        </Auth0Provider>
      </body>
    </html>
  )
}