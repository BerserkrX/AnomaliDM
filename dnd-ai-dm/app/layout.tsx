import './globals.css'
import { Inter } from 'next/font/google'
import NavBar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Anomali DM',
  description: 'AI-powered D&D platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`
          ${inter.className}
          flex flex-col h-screen m-0 p-0
          bg-background text-foreground
          overflow-hidden
        `}
      >
        {/* ── Fixed Top Bar ───────────────────────────── */}
        <NavBar />

        {/* ── Main Content Area (all pages render here) ── */}
        <main className="pt-16 flex-1 relative overflow-hidden">
          {children}
        </main>
      </body>
    </html>
  )
}
