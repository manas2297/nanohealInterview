import React from 'react';
import {Input} from 'antd';

const InputFiled = (props) => {
  const { wrapperStyle } = props;
    return (
      <div className={wrapperStyle}>
        <Input {...props}/>
      </div>
    )
}

export default InputFiled;