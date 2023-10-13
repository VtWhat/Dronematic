import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata = {
  title: 'Dronematic',
  description: 'Drone Services Assistant',
}

export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen bg-gray-50 flex flex-col items-center">
          {children}
          <Toaster
          position="top-right"
          reverseOrder={false}
        />
        </main>
      </body>
    </html>
  )
}
