import React from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import './episode.scss';

export default ({ title, number, isActive, onClick, blocked }) => {
  const className = classnames('episode', {
    'episode--active': isActive,
    'episode--blocked': blocked
  });
  return (
    <li>
      <Link
        href={!blocked && `/episodes?number=${number}`}
        as={!blocked && `/episodes/${number}`}
        shallow
        passHref
      >
        <span className={className} onClick={onClick}>
          {title}
        </span>
      </Link>
    </li>
  );
};
