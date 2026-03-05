import type { Metadata } from 'next'
import './globals.css'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
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
      <body className="bg-gray-50 flex flex-col min-h-screen" suppressHydrationWarning>
        <ToastProvider>
          <Nav />
          <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  )
}
