import './globals.css'
import LogoutButton from '../components/LogoutButton'
import DronematicLogo from '../components/DronematicLogo'

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
        </main>
      </body>
    </html>
  )
}
