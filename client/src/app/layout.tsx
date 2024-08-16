import './globals.css';
import { ThemeProvider } from './providers/next-theme-provider';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
