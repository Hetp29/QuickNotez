'use client';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import Navbar from '../landingPage/Navbar';
import { Card } from '@/components/ui/card';
import { auth } from '@/firebaseConfig';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setErrorMessage('');

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Please check your inbox.');
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid email address. Please enter a valid email.');
      } else if (error.code === 'auth/user-not-found') {
        setErrorMessage('No user found with this email address.');
      } else {
        setErrorMessage('Error sending reset email. Please try again.');
      }
      console.error('Error sending reset email', error);
    }
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
          Forgot Password
        </h1>

        <p className="mt-4 text-lg sm:text-xl text-black tracking-wide transition-transform duration-200 ease-out hover:scale-105"
          style={{ 
            fontFamily: "'Fira Code', monospace", 
            letterSpacing: '0.1em',
            textShadow: 'none',
          }}
        >
          Enter your email address to reset your password.
        </p>

        <div className="mt-8 flex justify-center w-full max-w-lg">
          <Card className="bg-gray-100 p-8 text-black shadow-lg w-full max-w-md">
            {message && (
              <div className="mb-4 text-green-500 text-sm">
                {message}
              </div>
            )}
            {errorMessage && (
              <div className="mb-4 text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
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
              <button type="submit" className="w-full bg-blue-500 text-white text-lg px-4 py-2 rounded-full font-semibold duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 hover:bg-blue-600 tracking-wide transition-transform duration-200 ease-out hover:scale-105">
                Send Reset Link
              </button>
            </form>

            <div className="mt-8 text-lg">
              <p className="text-gray-700">
                Remember your old password?{' '}
                <a href="/login" className="text-blue-500 hover:underline">
                  Log in here
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

export default ForgotPasswordPage;
