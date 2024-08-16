'use client';
import { useState } from 'react';
import Navbar from '../landingPage/Navbar';
import { Card } from '@/components/ui/card';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="min-h-screen flex flex-col bg-white text-black transition-colors duration-300">
      <Navbar />
      <div className="flex-1 flex flex-col justify-center items-center text-center overflow-auto px-4 sm:px-6 mt-16 pt-20">
        <h1 className="text-4xl sm:text-6xl font-semibold mb-4 text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105"
          style={{ 
            fontFamily: "'Fira Code', monospace", 
            letterSpacing: '0.15em',
            textShadow: 'none',
            fontWeight: '900'
          }}
        >
          Log In to QuickNotez
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105"
          style={{ 
            fontFamily: "'Fira Code', monospace", 
            letterSpacing: '0.1em',
            textShadow: 'none',
          }}
        >
          Enter your email and password!
        </p>

        <div className="mt-8 flex justify-center w-full max-w-lg">
          <Card className="bg-gray-100 p-8 text-black shadow-lg w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white"
                />
                <div className="mt-2 flex justify-center">
                  <a href="/forgot-password" className="text-blue-500 hover:underline">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-500 text-white text-lg px-4 py-2 rounded-full font-semibold duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:bg-blue-600 tracking-wide transition-transform duration-200 ease-out hover:scale-105">
                Log In
              </button>
            </form>

            <div className="mt-8 text-lg">
              <p className="text-gray-700">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Register here
                </a>
              </p>
            </div>

            <div className="mt-8 text-lg">
              <p className="text-gray-700">Or</p>
              <button className="w-full bg-red-500 text-white text-lg px-4 py-2 rounded-full font-semibold duration-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 hover:bg-red-600 tracking-wide transition-transform duration-200 ease-out hover:scale-105 mt-4">
                Sign In with Google
              </button>
            </div>
          </Card>
        </div>
      </div>
      <footer className="py-4 bg-white text-center text-gray-700">
        <p>© 2024 QuickNotez. All rights reserved.</p>
      </footer>
    </section>
  );
};

export default LoginPage;
