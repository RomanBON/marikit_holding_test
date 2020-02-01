import React, { ButtonHTMLAttributes } from 'react';
import cx from 'classnames';

import './style.css';


type Props = {
  styleType?: 'primary' | 'danger';
  isBlock?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = (props: Props) => {
  const {
    disabled,
    isBlock,
    type = 'button',
    styleType = 'primary',
    className,
    children,
    ...restProps
  } = props;
  const baseClassName = cx(className, Button.displayName, {
    '_disabled': disabled,
    '_block': isBlock,
    [`_${styleType}`]: styleType,
  });

  return (
    <button
      className={baseClassName}
      disabled={disabled}
      type={type}
      {...restProps}
    >
      <span className={`${Button.displayName}__text`}>
        {children}
      </span>
    </button>
  );
};

Button.displayName = 'Button';

export default Button;
