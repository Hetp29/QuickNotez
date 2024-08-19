import React, { useState, useRef } from 'react';
import { HiChevronRight } from 'react-icons/hi'; 

const Sidebar: React.FC = () => {
  const [width, setWidth] = useState(256);
  const minWidth = 150; 
  const maxWidth = 400; 
  const sidebarRef = useRef<HTMLDivElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={sidebarRef}
      className={`relative transition-all duration-300 h-screen bg-gray-100 flex flex-col`}
      style={{ width }}
    >
      <div className="flex items-center justify-between mb-6 p-4">
        <h1 className="text-xl font-semibold text-gray-700 truncate">
          Welcome to your own workspace!
        </h1>
        <button className="p-2">
          <HiChevronRight className="text-gray-600" />
        </button>
      </div>
      <div className="flex-1">
      </div>
      <div
        ref={resizerRef}
        onMouseDown={handleMouseDown}
        className="absolute right-0 top-0 h-full w-2 cursor-ew-resize bg-gray-300"
        style={{ zIndex: 1000 }} 
      />
    </div>
  );
};

export default Sidebar;
