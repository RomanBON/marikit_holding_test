import React, {
  useState,
  useEffect,
  InputHTMLAttributes,
  ChangeEvent,
  FocusEvent
} from 'react';
import cx from 'classnames';

import './style.css';


type Props = InputHTMLAttributes<HTMLInputElement>;

const InputNumber = (props: Props) => {
  const {
    className,
    value,
    min = 1,
    max = 1,
    onChange,
    onBlur,
    ...restProps
  } = props;
  const baseClassName = cx(className, InputNumber.displayName);
  const [valueState, setValue] = useState(value);

  useEffect(() => {
    if (valueState === value) {
      return;
    }

    setValue(value);
  }, [value]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value ? parseInt(e.target.value, 10) : '';
    setValue(newValue);

    if (newValue && newValue >= min && newValue <= max) {
      onChange && onChange(e);
    }
  }

  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    setValue(value);
    onBlur && onBlur(e);
  }

  return (
    <input
      type="number"
      value={valueState}
      min={min}
      max={max}
      className={baseClassName}
      onChange={handleChange}
      onBlur={handleBlur}
      {...restProps}
    />
  );
};

InputNumber.displayName = 'InputNumber';

export default InputNumber;
