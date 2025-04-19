import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JamSylph | Algorithm Engineer',
  description: 'Exploring the boundaries of data, building an intelligent future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700&family=Rajdhani:wght@300;400;500;600;700&display=swap" 
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
