'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); 

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenuAndRedirect = (path: string) => {
    setIsOpen(false);
    router.push(path);
  };

  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, [isOpen]);

  return (
    <nav className="bg-transparent py-4 px-8 shadow-lg border-b border-gray-200 relative">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-4 text-2xl font-bold text-white">
          <Link href="/" legacyBehavior>
            <a className="flex items-center">
              <span 
                className="text-5xl tracking-wide font-extrabold hover:scale-105 transition-transform duration-200 ease-out text-purple-150"
                style={{ 
                  fontFamily: "'Fira Code', monospace", 
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  transform: 'scale(1.2)',
                  fontWeight: '900'
                }}
              >
                QN
              </span>
              <span 
                className="ml-3 text-3xl tracking-wide hover:scale-105 transition-transform duration-200 ease-out text-purple-150"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: '0.15em',
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                  fontWeight: '900'
                }}
              >
                QuickNotez
              </span>
            </a>
          </Link>
        </div>
        <button 
          onClick={toggleMenu} 
          className="block lg:hidden text-white focus:outline-none"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16m-7 6h7" 
            />
          </svg>
        </button>
        <div className={`lg:flex lg:items-center lg:space-x-6 text-lg font-medium text-white ${isOpen ? 'block' : 'hidden'} lg:block`}>
          <Link href="/products" legacyBehavior>
            <a 
              className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out"
              style={{
                fontFamily: "'Fira Code', monospace",
                letterSpacing: '0.1em',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                fontWeight: '700'
              }}
            >
              Products
            </a>
          </Link>
          <Link href="/resources" legacyBehavior>
            <a 
              className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out"
              style={{
                fontFamily: "'Fira Code', monospace",
                letterSpacing: '0.1em',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                fontWeight: '700'
              }}
            >
              Resources
            </a>
          </Link>
          <Link href="/download" legacyBehavior>
            <a 
              className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out"
              style={{
                fontFamily: "'Fira Code', monospace",
                letterSpacing: '0.1em',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                fontWeight: '700'
              }}
            >
              Download
            </a>
          </Link>
          <Link href="/login" legacyBehavior>
            <a 
              className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out"
              style={{
                fontFamily: "'Fira Code', monospace",
                letterSpacing: '0.1em',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                fontWeight: '700'
              }}
            >
              Login
            </a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a 
              className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out"
              style={{
                fontFamily: "'Fira Code', monospace",
                letterSpacing: '0.1em',
                textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                fontWeight: '700'
              }}
            >
              Sign Up
            </a>
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black text-white flex flex-col justify-start p-4 overflow-hidden z-50">
          <div className="flex flex-col items-center space-y-4 mt-10">
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 text-white"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
            <Link href="/products" legacyBehavior>
              <a 
                className="block py-2 px-4 hover:bg-gray-700 transition-colors duration-200 ease-out"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: '0.1em',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                  fontWeight: '700'
                }}
              >
                Products
              </a>
            </Link>
            <Link href="/resources" legacyBehavior>
              <a 
                className="block py-2 px-4 hover:bg-gray-700 transition-colors duration-200 ease-out"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: '0.1em',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                  fontWeight: '700'
                }}
              >
                Resources
              </a>
            </Link>
            <Link href="/download" legacyBehavior>
              <a 
                className="block py-2 px-4 hover:bg-gray-700 transition-colors duration-200 ease-out"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: '0.1em',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                  fontWeight: '700'
                }}
              >
                Download
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a 
                className="block py-2 px-4 hover:bg-gray-700 transition-colors duration-200 ease-out"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: '0.1em',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                  fontWeight: '700'
                }}
              >
                Login
              </a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a 
                className="block py-2 px-4 hover:bg-gray-700 transition-colors duration-200 ease-out"
                style={{
                  fontFamily: "'Fira Code', monospace",
                  letterSpacing: '0.1em',
                  textShadow: '0 0 5px rgba(255, 255, 255, 0.8)',
                  fontWeight: '700'
                }}
              >
                Sign Up
              </a>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
