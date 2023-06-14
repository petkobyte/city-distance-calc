import React from 'react';
import { Outlet } from 'react-router-dom';
import './RootLayout.scss';
import Card from 'antd/es/card/Card';

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
