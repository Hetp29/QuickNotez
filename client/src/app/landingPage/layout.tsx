import React from "react";
import { useTheme } from 'next-themes';

const HomePageLayout = ({ children }:  {children:React.ReactNode }) => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <main className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
            <header className="flex justify-end p-4">
                
            </header>
            {children}
        </main>
    );
}

export default HomePageLayout;
