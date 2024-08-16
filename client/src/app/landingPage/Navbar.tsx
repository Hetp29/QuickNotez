'import client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoginClick = () => {
    router.push('/login'); // Navigate to the login page
  };

  return (
    <nav className="bg-white fixed w-full z-50 top-0 left-0 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" onClick={scrollToTop} className="flex items-center cursor-pointer">
              <span className="text-gray-900 text-4xl font-extrabold tracking-wide">QN</span>
              <span className="text-gray-900 text-2xl font-bold ml-2">QuickNotez</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/products" className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm">
                Products
              </Link>
              <Link href="/resources" className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm">
                Resources
              </Link>
              <Link href="/download" className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm">
                Download
              </Link>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm cursor-pointer"
              >
                Pricing
              </button>
              <button
                onClick={handleLoginClick}
                className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 focus:text-gray-700"
              aria-controls="mobile-menu" 
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40">
          <div className="flex flex-col items-center justify-center h-full">
            <button 
              onClick={() => setIsOpen(false)} 
              type="button" 
              className="absolute top-4 right-4 p-2 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none"
              aria-controls="mobile-menu" 
              aria-expanded={isOpen}
            >
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="px-2 space-y-4">
              <Link href="/products" className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base">
                Products
              </Link>
              <Link href="/resources" className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base">
                Resources
              </Link>
              <Link href="/download" className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base">
                Download
              </Link>
              <button
                onClick={() => scrollToSection('pricing')}
                className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base cursor-pointer"
              >
                Pricing
              </button>
              <Link href="/login" className="text-gray-900 font-bold tracking-wide hover:bg-gray-200 hover:text-gray-900 block px-3 py-2 rounded-md text-base">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;