import React from 'react';
import { DatePicker } from 'antd';

const DatePickerComponent  = props => {
  const {
    wrapperClass,
  } = props;
  return (
    <div className={wrapperClass}>
      <span>
        <DatePicker
          showTime={false}
          allowClear
          {...props}
        />
      </span>
    </div>
  );
}

export default DatePickerComponent