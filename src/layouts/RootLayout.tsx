import React from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.scss';

export const RootLayout = () => {
  return (
    <div className='root-layout'>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
