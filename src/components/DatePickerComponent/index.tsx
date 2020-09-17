import React from 'react';
import { DatePicker } from 'antd';
import { Moment } from 'moment';
type DatePickerProps = {
  wrapperClass? : string,
  placeHolder? : string,
  name? : string,
  onChange: (value: Moment | null, dateString: string) => void,
};
const DatePickerComponent: React.FC<DatePickerProps>  = props => {
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