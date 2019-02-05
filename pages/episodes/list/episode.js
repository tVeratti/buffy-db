import React, { PureComponent } from 'react';
import Link from 'next/link';

export default ({ number, title }) => {
  const uri = encodeURI(title);
  return (
    <li className="episode">
      <Link href={`/episodes?number=${number}`} as={`/episodes/${title}`}>
        <div>{title}</div>
      </Link>
    </li>
  );
};
