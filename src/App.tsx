import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routing/Router';
import { ConfigProvider } from 'antd';
import { mainTheme } from './styles/theme';

function App() {
  return (
    <ConfigProvider theme={mainTheme}>
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
