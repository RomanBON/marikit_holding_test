import React, { InputHTMLAttributes } from 'react';
import cx from 'classnames';

import { InputNumber } from '../../ui';
import './style.css';


type Props = {
  addon?: React.ReactNode;
  warningMessage?: string;
  isIncreased?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const InputNumberQuantity = (props: Props) => {
  const {
    className,
    addon,
    warningMessage,
    isIncreased,
    ...restProps
  } = props;
  const baseClassName = cx(className, InputNumberQuantity.displayName);
  const inputClassName = cx(`${InputNumberQuantity.displayName}__input`, {
    _increased: isIncreased,
    _decreased: !isIncreased,
  });

  return (
    <div className={baseClassName}>
      <div className={`${InputNumberQuantity.displayName}__control`}>
        <InputNumber
          className={inputClassName}
          {...restProps}
        />
        {' '}
        {addon && (
          <span className={`${InputNumberQuantity.displayName}__addon`}>
            {addon}
          </span>
        )}
      </div>

      {warningMessage && (
        <div className={`${InputNumberQuantity.displayName}__warning`}>
          {warningMessage}
        </div>
      )}
    </div>
  );
};

InputNumberQuantity.displayName = 'InputNumberQuantity';

export default InputNumberQuantity;
