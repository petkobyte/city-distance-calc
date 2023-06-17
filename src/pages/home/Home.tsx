import React, { useMemo } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import Button from 'antd/lib/button';
import { useTranslation } from 'react-i18next';
const { useBreakpoint } = Grid;

export const Home = () => {
  const screens = useBreakpoint();
  const { t } = useTranslation();

  const mobileScreen: boolean = useMemo(() => !!screens.xs, [screens]);

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={mobileScreen ? 24 : 8}>One of three columns</Col>
        <Col span={mobileScreen ? 24 : 8}>One of three columns</Col>
        <Col span={mobileScreen ? 24 : 8}>One of three columns</Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}
        >
          <Button size='large'>{t('res_submit')}</Button>
        </Col>
      </Row>
    </>
  );
};
