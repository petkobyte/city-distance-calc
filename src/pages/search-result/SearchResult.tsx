import React, { useEffect, useMemo, useState } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import Timeline from 'antd/lib/timeline';
import { City, cities } from '../../constants/cities';
import { calculateDistance } from '../../utils/distanceCalculator';
import Tooltip from 'antd/lib/tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

const { useBreakpoint } = Grid;
interface SearchParams {
  [key: string]: string;
}

export const SearchResult = () => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [cityDistances, setCityDistances] = useState<(string | number)[]>([]);
  const [distances, setDistances] = useState<number[]>([]);

  useEffect(() => {
    const currentParams = Object.fromEntries([...searchParams]);

    findCityDistances(extractCityItems(currentParams));
  }, [searchParams]);

  const mobileMode: boolean = useMemo(() => !!screens.xs, [screens]);

  const findCityDistances = (cityList: string[]) => {
    const cityDistances: (string | number)[] = [];
    const distances: number[] = [];

    for (let i = 0; i < cityList.length - 1; i++) {
      const city1 = cityList[i];
      const [, lat1, lon1] = cities.find(([city]) => city === city1) || [];

      const city2 = cityList[i + 1];
      const [, lat2, lon2] = cities.find(([city]) => city === city2) || [];

      const distance = calculateDistance(lat1!, lon1!, lat2!, lon2!);
      if (!cityDistances.includes(city1)) {
        cityDistances.push(city1);
      }

      cityDistances.push(distance, city2);
      distances.push(distance);
    }

    setCityDistances(cityDistances);
    console.log(cityDistances);
  };

  const extractCityItems = (params: SearchParams): string[] => {
    return Object.entries(params).reduce((result: string[], [key, value]) => {
      if (key.startsWith('city')) {
        return [...result, value];
      }
      return result;
    }, []);
  };

  const renderTimelineItems = () => {
    return cityDistances.map((item: string | number, index: number) => {
      const isLastItem: boolean = index === cityDistances.length - 1;

      return {
        children: typeof item === 'number' ? <Tooltip placement='left' open title={item} /> : item,
        color: isLastItem ? 'red' : 'black',
        dot:
          typeof item === 'number' ? (
            <></>
          ) : isLastItem ? (
            <FontAwesomeIcon icon={faLocationDot} />
          ) : undefined,
      };
    });
  };

  return (
    <>
      <Row gutter={[32, 32]}>
        <Col span={24}>
          <Timeline mode='alternate' items={renderTimelineItems()} />
        </Col>
      </Row>
      <Row>
        <Col
          span={24}
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 32 }}
        >
          <Button
            mobile={mobileMode ? mobileMode : undefined}
            type='primary'
            size='large'
            onClick={() => navigate('/')}
          >
            {t('res_back')}
          </Button>
        </Col>
      </Row>
    </>
  );
};
