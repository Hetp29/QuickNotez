import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLightMode, setLightMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('light', isLightMode);
    document.documentElement.classList.toggle('dark', !isLightMode);
  }, [isLightMode])

  return (
    <nav className="bg-gray-900 fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" legacyBehavior>
              <a className="flex items-center">
                <span className="text-white text-4xl font-extrabold tracking-wide aura">QN</span>
                <span className="text-white text-2xl font-bold ml-2">QuickNotez</span>
              </a>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/products" legacyBehavior>
                <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm">Products</a>
              </Link>
              <Link href="/resources" legacyBehavior>
                <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm">Resources</a>
              </Link>
              <Link href="/download" legacyBehavior>
                <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm">Download</a>
              </Link>
              <a href="#pricing" className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm">Pricing</a>
              <Link href="/login" legacyBehavior>
                <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm">Login</a>
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              type="button" 
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
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
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/products" legacyBehavior>
              <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base">Products</a>
            </Link>
            <Link href="/resources" legacyBehavior>
              <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base">Resources</a>
            </Link>
            <Link href="/download" legacyBehavior>
              <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base">Download</a>
            </Link>
            <a href="#pricing" className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base">Pricing</a>
            <Link href="/login" legacyBehavior>
              <a className="text-white font-bold tracking-wide hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base">Login</a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

