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
                className="text-4xl tracking-wide font-extrabold hover:scale-105 transition-transform duration-200 ease-out text-purple-400"
                style={{ fontFamily: "'Fira Code', monospace", letterSpacing: '0.1em' }}
              >
                QN
              </span>
              <span className="ml-3 text-3xl tracking-wide hover:scale-105 transition-transform duration-200 ease-out text-white">
                QuickNotez
              </span>
            </a>
          </Link>
        </div>
        <div className="space-x-6 text-lg font-medium text-white">
          <Link href="/products" legacyBehavior>
            <a className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out">
              Products
            </a>
          </Link>
          <Link href="/resources" legacyBehavior>
            <a className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out">
              Resources
            </a>
          </Link>
          <Link href="/download" legacyBehavior>
            <a className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out">
              Download
            </a>
          </Link>
          <Link href="/login" legacyBehavior>
            <a className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out">
              Login
            </a>
          </Link>
          <Link href="/signup" legacyBehavior>
            <a className="hover:text-blue-300 hover:underline transition-colors duration-200 ease-out">
              Sign Up
            </a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
