import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from './providers/next-theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QuickNotez',
  description: 'Your note-taking application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>{children}</ThemeProvider>
        {children}
      </body>
    </html>
  );
}
