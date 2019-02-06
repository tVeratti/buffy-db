import React from 'react';
import Link from 'next/link';
import getSlug from 'speakingurl';

export default ({ title, number }) => {
  return (
    <li className="episode">
      <Link href={`/episodes?number=${number}`} as={`/episodes/${number}`}>
        <div>{title}</div>
      </Link>
    </li>
  );
};
