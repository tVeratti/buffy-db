import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import './episode.scss';

export default ({ title, number, isActive }) => {
  const className = classnames('episode', {
    'episode--active': isActive
  });
  return (
    <li>
      <Link
        href={`/episodes?number=${number}`}
        as={`/episodes/${number}`}
        shallow
        passHref
      >
        <span className={className}>{title}</span>
      </Link>
    </li>
  );
};
