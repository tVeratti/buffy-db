import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import './season.scss';

export default ({ number, isActive, onClick }) => {
  const className = classnames('season', {
    'season--active': isActive
  });

  return (
    <li>
      <button
        className={className}
        title={`Season ${number}`}
        onClick={onClick}
      >
        <span className="season__number" />
      </button>
    </li>
  );
};
