import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 bg-gray-100 text-gray-800 border-t border-gray-300">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        
        <div className="flex items-center space-x-4">
          
          
          <p className="text-sm">&copy; {new Date().getFullYear()} QuickNotez. All Rights Reserved.</p>
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
