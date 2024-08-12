'use client';
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4 px-8 shadow-lg border-b border-gray-200">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center space-x-4 text-2xl font-bold text-white">
          <Link href="/" legacyBehavior>
            <a className="flex items-center">
              <Image 
                src="/images/logo.png"
                alt="Logo"
                width={50}
                height={40}
                className="object-contain"
                style={{ width: 'auto', height: 'auto' }} // Maintain aspect ratio
              />
              <span className="ml-3 text-3xl tracking-wide hover:scale-105 transition-transform duration-200 ease-out">
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
