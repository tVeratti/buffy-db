import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import './season.scss';

export default ({ season, first, isActive, setState }) => {
  const className = classnames('season', {
    'season--active': isActive
  });

  return (
    <li>
      <Link
        href={`/episodes?number=${first}`}
        as={`/episodes/${first}`}
        passHref
      >
        <a className={className} onClick={() => setState(season)}>
          <span className="season__number">{season}</span>
        </a>
      </Link>
    </li>
  );
};
