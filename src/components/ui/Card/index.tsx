import React, { useState } from 'react';
import cx from 'classnames';

import './style.css';


type Props = {
  /** card title */
  title: string;
  /** additional class */
  className?: string;
  /** children node */
  children?: React.ReactNode;
  /** flag to make card collapsible */
  isCollapsible?: boolean;
  /** flag indicating initial state of collapse */
  isCollapsed?: boolean;
};

const Card = (props: Props) => {
  const {
    className,
    title,
    children,
    isCollapsible,
    isCollapsed = false,
    ...restProps } = props;
  const [isStateCollapsed, setCollapsed] = useState(isCollapsed);
  const baseClassName = cx(className, Card.displayName, {
    _collapsible: isCollapsible,
    _collapsed: isStateCollapsed,
  });

  return (
    <div className={baseClassName} {...restProps}>
      <div
        className={`${Card.displayName}__title`}
        onClick={() => setCollapsed(!isStateCollapsed)}
      >
        {title}
      </div>
      <div className={`${Card.displayName}__content`}>
        {children}
      </div>
    </div>
  );
};

Card.displayName = 'Card';

export default Card;
