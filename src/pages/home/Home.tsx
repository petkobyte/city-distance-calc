import React, { useMemo, useState } from 'react';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Grid from 'antd/lib/grid';
import { useTranslation } from 'react-i18next';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import Space from 'antd/lib/space';
import Select from 'antd/lib/select';
import Form from 'antd/lib/form';
import message from 'antd/lib/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faLocationDot, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';
import { NumberInput } from '../../components/number-input';
import DatePicker from 'antd/lib/date-picker';
import { CityType } from '../../constants/cityTypes';
import { City, cities } from '../../constants/cities';
import Spin from 'antd/lib/spin';
import { Timeline } from '../../components/timeline';

const { useBreakpoint } = Grid;

export const Home = () => {
  const screens = useBreakpoint();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [passengers, setPassengers] = useState<number>(1);

  const [cityFieldsKeys, setCityFieldsKeys] = useState<string[]>([
    CityType.CITY_ORIGIN,
    CityType.CITY_DESTINATION,
  ]);
  const [nextKey, setNextKey] = useState(1);

  const [searchResults, setSearchResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const mobileMode: boolean = useMemo(() => !!screens.xs, [screens]);

  const onFinish = (values: any) => {
    navigate({
      pathname: '/result',
      search: createSearchParams(values).toString(),
    });
  };

  const onFinishFailed = () => {
    message.error(t('res_submitFailed'));
  };

  const handleAddCityField = () => {
    const updatedFields = [...cityFieldsKeys];
    updatedFields.push(`${CityType.CITY_DESTINATION}_${nextKey}`);
    setCityFieldsKeys(updatedFields);
    setNextKey(nextKey + 1);
  };

  const handleRemoveCityField = (key: string) => {
    const updatedFields = cityFieldsKeys.filter((field) => field !== key);
    setCityFieldsKeys(updatedFields);
  };

  const searchCities = (keyword: string): Promise<City[]> => {
    const delay: number = 1000;
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredCities = cities.filter(([name]) =>
          name.toLowerCase().includes(keyword.toLowerCase()),
        );
        resolve(filteredCities);
      }, delay);
    });
  };

  const handleSearch = async (keyword: string) => {
    setIsLoading(true);
    try {
      const results = await searchCities(keyword);
      setSearchResults(results);
    } catch (error) {
      message.error('Failed to fetch cities');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const createCityFields = () => {
    return cityFieldsKeys.map((field: string, index: number) => {
      const isOrigin: boolean = field === CityType.CITY_ORIGIN;
      const isLastItem: boolean = index === cityFieldsKeys.length - 1;

      return {
        dot: isLastItem ? <FontAwesomeIcon icon={faLocationDot} /> : undefined,
        color: isLastItem ? 'red' : 'black',
        children: (
          <div key={field} className='select-with-additional-item'>
            <Form.Item
              key={field}
              name={field}
              label={isOrigin ? t('res_cityOfOrigin') : t('res_cityOfDestination')}
              rules={[{ required: true }, { type: 'string', min: 1 }]}
            >
              <Select
                key={field}
                className='select-component'
                size='large'
                showSearch
                allowClear
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={(e) => {
                  if (e.length > 0) {
                    handleSearch(e);
                  }
                }}
                onFocus={() => setSearchResults([])}
                notFoundContent={isLoading ? <Spin size='small'>{t('res_loading')}</Spin> : null}
                options={searchResults.map(([name, lat, lon]) => ({
                  value: name,
                  label: name,
                }))}
              />
            </Form.Item>
            {!isOrigin && cityFieldsKeys.length > 2 && (
              <div className='remove-icon-wrapper'>
                <FontAwesomeIcon
                  onClick={() => handleRemoveCityField(field)}
                  className='remove-icon'
                  icon={faCircleXmark}
                  size='lg'
                />
              </div>
            )}
          </div>
        ),
      };
    });
  };

  const cityFields = useMemo(() => createCityFields(), [cityFieldsKeys, searchResults, isLoading]);

  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
      requiredMark={false}
    >
      <Row gutter={[64, 16]}>
        <Col span={mobileMode ? 24 : 16}>
          <Space size='large' className='timeline-space'>
            <Timeline items={cityFields} />
          </Space>
          <Space size='middle' className='add-destination' onClick={handleAddCityField}>
            <FontAwesomeIcon icon={faPlusCircle} size='lg' />
            <div>{t('res_addDestination')}</div>
          </Space>
        </Col>
        <Col span={mobileMode ? 24 : 8}>
          <Space
            size='large'
            direction={mobileMode ? 'horizontal' : 'vertical'}
            className={mobileMode ? 'mobile-passenger-date' : ''}
          >
            <Form.Item name='passengers' label={t('res_passengers')} initialValue={passengers}>
              <NumberInput value={passengers} onChange={setPassengers} />
            </Form.Item>

            <Form.Item
              name='date'
              label={t('res_date')}
              rules={[{ required: true }, { type: 'date' }]}
            >
              <DatePicker size='large' style={{ width: '100%' }} />
            </Form.Item>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={24} className='align-center'>
          <Button mobile={mobileMode} type='primary' size='large' htmlType='submit'>
            {t('res_submit')}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
