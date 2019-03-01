import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import './season.scss';

export default ({ season, isActive }) => {
  const { first, number } = season;
  const className = classnames('season', {
    'season--active': isActive
  });

  return (
    <li>
      <Link
        href={`/episodes?number=${first.number}`}
        as={`/episodes/${first.number}`}
        passHref
      >
        <a className={className}>
          <span className="season__number">{number}</span>
        </a>
      </Link>
    </li>
  );
};
