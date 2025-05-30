import './styles/globals.css'
import { SessionProvider } from 'next-auth/react'

export const metadata = {
  title: 'Job Copilot',
  description: 'Apply faster with AI'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}