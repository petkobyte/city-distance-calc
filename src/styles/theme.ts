import { ThemeConfig } from 'antd';

// theming example
export const mainTheme: ThemeConfig = {
  token: {
    colorPrimary: '#7786D2',
  },
  components: {
    Button: {
      colorPrimary: 'black',
    },
    Card: {
      borderRadiusOuter: 16,
      borderRadius: 16,
    },
    Tooltip: {
      colorBgDefault: '#7786D2',
    },
  },
};

export const helperButtonsTheme: ThemeConfig = {
  components: {
    Button: {
      colorPrimary: '#C7D1F4',
      colorPrimaryHover: '#7786D2',
    },
  },
};
