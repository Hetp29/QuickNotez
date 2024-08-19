'use client';

import { useState } from 'react';
import React from 'react';
import Sidebar from './sidebar/Sidebar';

const Page = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <main className='flex-1 p-4 bg-gray-100'>

      </main>
    </div>
  )
};

export default Page;
