import React from 'react';
import Space from 'antd/lib/space';
import { Button } from '../button/Button';
import './style.scss';
import ConfigProvider from 'antd/lib/config-provider';
import { helperButtonsTheme } from '../../styles/theme';
import { NumberInputProps } from './types';

export const NumberInput = (props: NumberInputProps) => {
  const increaseValue = () => {
    props.onChange(props.value + 1);
  };

  const decreaseValue = () => {
    props.onChange(props.value > 1 ? props.value - 1 : props.value);
  };

  return (
    // example of localized theme config provider (theme applied only to specific children)
    <ConfigProvider theme={helperButtonsTheme}>
      <Space className='number-input-wrapper' size='middle'>
        <Button type='primary' onClick={decreaseValue} disabled={props.value < 2}>
          -
        </Button>{' '}
        <div>{props.value}</div>{' '}
        <Button type='primary' onClick={increaseValue}>
          +
        </Button>
      </Space>
    </ConfigProvider>
  );
};
