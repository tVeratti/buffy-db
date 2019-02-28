import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import './season.scss';

export default ({ number, isActive, setState }) => {
  const className = classnames('season', {
    'season--active': isActive
  });

  return (
    <li>
      <button className={className} onClick={() => setState(number)}>
        {number}
      </button>
    </li>
  );
};
