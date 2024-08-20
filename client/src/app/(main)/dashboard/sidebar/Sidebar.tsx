"use client";
import React, { useState, useEffect, useRef } from 'react';
import { HiChevronRight, HiPlus } from 'react-icons/hi'; // Import HiPlus for the new page button
import { auth } from '@/firebaseConfig';

const Sidebar: React.FC = () => {
    const [width, setWidth] = useState(256);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState<firebase.User | null>(null);
    const minWidth = 150;
    const maxWidth = 700;  // Increased maxWidth to allow more expansion
    const sidebarRef = useRef<HTMLDivElement>(null);
    const resizerRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(setUser);
      return () => unsubscribe();
    }, []);
  
    const handleMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      const startX = e.clientX;
  
      const handleMouseMove = (moveEvent: MouseEvent) => {
        const newWidth = Math.min(Math.max(width + (moveEvent.clientX - startX), minWidth), maxWidth);
        setWidth(newWidth);
      };
  
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCreateNewPage = () => {
      
      console.log('Create new page');
    };
  
    return (
      <div
        ref={sidebarRef}
        className={`relative transition-all duration-300 h-screen bg-gray-100 flex flex-col`}
        style={{ width }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-400 w-full">
          <div className="flex items-center gap-2 flex-grow">
            <div 
              className="relative flex items-center justify-center bg-gray-500 w-20 h-20 text-white rounded-full cursor-pointer"
              onClick={toggleDropdown}
            >
              <span className="text-4xl">{user?.displayName?.[0] || 'A'}</span>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-3 w-96 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="px-12 py-8 text-gray-800 border-b border-gray-300">
                    <p className="font-semibold">{user?.displayName || 'User Name'}'s Workspace</p>
                    <p className="text-sm text-gray-600">{user?.email || 'user@example.com'}</p>
                  </div>
                  <ul className="py-6">
                    <li className="px-12 py-4 text-gray-700 hover:bg-gray-100">Profile</li>
                    <li className="px-12 py-4 text-gray-700 hover:bg-gray-100">Settings</li>
                    <li className="px-12 py-4 text-gray-700 hover:bg-gray-100">Logout</li>
                  </ul>
                </div>
              )}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-3xl font-semibold text-gray-800 truncate">
                Your Workspace!
              </h1>
            </div>
          </div>
          <button 
            className="p-2"
            onClick={handleCreateNewPage} // Handle the button click
          >
            <HiPlus className="text-gray-600 text-4xl" />
          </button>
        </div>

        <div className="flex-1">
        </div>
        <div
          ref={resizerRef}
          onMouseDown={handleMouseDown}
          className="absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-gray-300 border-r border-gray-400"
          style={{ zIndex: 1000 }} 
        />
      </div>
    );
};

export default Sidebar;
