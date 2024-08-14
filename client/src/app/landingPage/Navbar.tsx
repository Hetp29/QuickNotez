'use client';
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4 px-8 shadow-lg border-b border-gray-200">
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
        <div className="space-x-6 text-lg font-medium text-white">
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
              Pricing
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
              Login
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
