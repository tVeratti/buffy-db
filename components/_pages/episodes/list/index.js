import React, { useContext } from 'react';
import { Placeholder } from 'react-suspense-polyfill';

import Loading from '../../../loading';
import { Context } from '../context';
import Episode from './episode';

import './index.scss';

export default ({ active }) => {
  const { episodes } = useContext(Context);

  return (
    <Placeholder fallback={<Loading />}>
      <ul className="episodes__list">
        {episodes.map((e, i) => (
          <Episode
            key={e.number}
            index={i}
            isActive={e.number == active}
            {...e}
          />
        ))}
      </ul>
    </Placeholder>
  );
};
