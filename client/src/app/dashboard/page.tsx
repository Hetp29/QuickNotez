'use client';

import { useState } from 'react';

const DashboardPage = () => {
  const [selectedTab, setSelectedTab] = useState('home');

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">QuickNotez Dashboard</h1>
          <button className="bg-blue-800 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg p-4">
          <ul>
            <li
              onClick={() => setSelectedTab('home')}
              className={`cursor-pointer p-2 ${selectedTab === 'home' ? 'bg-blue-100 font-bold' : ''}`}
            >
              Home
            </li>
            <li
              onClick={() => setSelectedTab('notes')}
              className={`cursor-pointer p-2 ${selectedTab === 'notes' ? 'bg-blue-100 font-bold' : ''}`}
            >
              Notes
            </li>
            <li
              onClick={() => setSelectedTab('tasks')}
              className={`cursor-pointer p-2 ${selectedTab === 'tasks' ? 'bg-blue-100 font-bold' : ''}`}
            >
              Tasks
            </li>
            <li
              onClick={() => setSelectedTab('settings')}
              className={`cursor-pointer p-2 ${selectedTab === 'settings' ? 'bg-blue-100 font-bold' : ''}`}
            >
              Settings
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {selectedTab === 'home' && <div>Welcome to your dashboard!</div>}
          {selectedTab === 'notes' && <div>Notes section</div>}
          {selectedTab === 'tasks' && <div>Tasks section</div>}
          {selectedTab === 'settings' && <div>Settings section</div>}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
