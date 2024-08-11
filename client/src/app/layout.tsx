import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './providers/next-theme-provider';
import React from 'react'
import LandingPage from './landingPage/page'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
        >
          <LandingPage />

        </ThemeProvider>
      </body>
    </html>
  )
}

