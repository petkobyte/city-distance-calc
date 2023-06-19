import React, { FC } from 'react';
import './styles.scss';
import AntDTimeline from 'antd/lib/timeline';
import { TimelineProps } from 'antd/lib/timeline';

export const Timeline: FC<TimelineProps> = ({ ...props }) => {
  return <AntDTimeline className='custom-timeline' {...props} />;
};
