import React from 'react';
import { Outlet } from 'react-router-dom';
import './rootLayout.scss';
import Card from 'antd/lib/card';

export const RootLayout = () => {
  return (
    <div className='root-layout'>
      <Card bordered={false} className='main-card'>
        <main>
          <Outlet />
        </main>
      </Card>
    </div>
  );
};
