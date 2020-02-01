import React from 'react';
import cx from 'classnames';

import spinnerSvg from '../../../assets/spinner.svg';
import './style.css';


type Props = {
  className?: string;
};

const Loader = (props: Props) => {
  const { className, ...restProps } = props;
  const baseClassName = cx(className, Loader.displayName);

  return (
    <div className={baseClassName} {...restProps}>
      <img
        className={`${Loader.displayName}__img`}
        src={spinnerSvg}
        alt="spinner"
      />
    </div>
  );
};

Loader.displayName = 'Loader';

export default Loader;
