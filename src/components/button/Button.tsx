import React, { FC, PropsWithChildren } from 'react';
import AntDButton from 'antd/lib/button';
import { CustomButtonProps } from './types';
import './styles.scss';

export const Button: FC<PropsWithChildren<CustomButtonProps>> = ({ children, ...props }) => {
  return (
    <AntDButton {...props} className={`${props.mobile && 'mobile-button-size'}`}>
      {children}
    </AntDButton>
  );
};
