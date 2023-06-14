import React, { useMemo } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import { Grid } from 'antd';
const { useBreakpoint } = Grid;

export const Home = () => {
  const screens = useBreakpoint();

  const mobileScreen: boolean = useMemo(() => !!screens.xs, [screens]);

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={mobileScreen ? 24 : 8}>One of three columns</Col>
        <Col span={mobileScreen ? 24 : 8}>One of three columns</Col>
        <Col span={mobileScreen ? 24 : 8}>One of three columns</Col>
      </Row>
    </>
  );
};
