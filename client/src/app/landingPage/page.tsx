'use client';
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to QuickNotez</h1>
      <div className="space-x-4">
        <Link href="/signup" legacyBehavior>
          <a className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Sign Up
          </a>
        </Link>
        <Link href="/login" legacyBehavior>
          <a className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600">
            Login
          </a>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage;