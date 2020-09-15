import React from 'react';

import { ReactComponent as CalendarSvg } from '../images/svg/calendar-icon.svg'
import Icon from '@ant-design/icons';
export const CalendarIcon = props => (
  <Icon component={CalendarSvg} {...props} />
);