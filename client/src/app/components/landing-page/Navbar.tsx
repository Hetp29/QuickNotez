import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-transparent py-4 px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">
          <Link href="/">
            QuickNotez
          </Link>
        </div>
        <div className="space-x-6 text-white">
          <Link href="/products">Products</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/download">Download</Link>
          <Link href="/login">Login</Link>
          <Link href="/signup">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
