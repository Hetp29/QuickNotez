import './globals.css';
import { ThemeProvider } from './providers/next-theme-provider';
import React from 'react';
import LandingPage from './landingPage/page';

export default function RootLayout() {
  return (
    <html suppressHydrationWarning={true} lang="en">
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
  );
}

