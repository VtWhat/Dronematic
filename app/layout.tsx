import { Toaster } from 'react-hot-toast'
import './globals.css'

import {Providers} from "./providers";

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
      <html lang="en" className='light bg-zinc-100'>
        <body>
          <Providers>
            {children}
          </Providers>
          <Toaster
          position="top-right"
          reverseOrder={false}
          />
        </body>
      </html>
  )
}
