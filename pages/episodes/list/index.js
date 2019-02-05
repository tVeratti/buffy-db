import React, { PureComponent } from 'react';
import { Placeholder } from 'react-suspense-polyfill';

import Loading from '../../../components/loading';
import Episode from './episode';

export default ({ episodes }) => {
  return (
    <Placeholder fallback={<Loading />}>
      <ul className="episodes__list">
        {episodes.map((e, i) => (
          <Episode key={e.number} index={i} {...e} />
        ))}
      </ul>
    </Placeholder>
  );
};
