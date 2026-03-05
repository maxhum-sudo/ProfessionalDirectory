import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { ToastProvider } from '@/components/ui/Toast'

export const metadata: Metadata = {
  title: 'Calgary Coworking Directory',
  description: 'A private directory of Calgary professionals working remotely',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50" suppressHydrationWarning>
        <ToastProvider>
          <Nav />
          <main className="max-w-6xl mx-auto px-4 py-8">
            {children}
          </main>
        </ToastProvider>
      </body>
    </html>
  )
}
