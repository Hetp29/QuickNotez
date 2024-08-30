import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-300 border-t border-gray-300 dark:border-gray-900 transition-colors duration-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <p className="text-sm text-gray-800 dark:text-gray-300 transition-none">&copy; QuickNotez. All Rights Reserved.</p>
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="/about" className="text-sm hover:underline">About</a>
          <a href="/privacy" className="text-sm hover:underline">Privacy Policy</a>
          <a href="/terms" className="text-sm hover:underline">Terms of Service</a>
          <a href="/contact" className="text-sm hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
