import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4 px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-2xl font-bold text-white">
          <Link href="/">
            <Image 
              src="/images/logo.png"
              alt="Logo"
              width={55}
              height={40}
              className="object-contain"  // This class should respect the aspect ratio
              style={{ width: 'auto', height: 'auto' }} // Ensure aspect ratio is maintained
            />
          </Link>
          <Link href="/">
            QuickNotez
          </Link>
        </div>
        <div className="space-x-6 text-white">
          <Link href="/products">Products</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/download">Download</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;