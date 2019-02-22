import React, { useContext } from 'react';
import memoize from 'memoize-one';

import { Context } from '../context';
import Rating from './rating';

import './index.scss';

const findEpisode = memoize((episodes, number) =>
  episodes.find(e => e.number == number)
);

export default ({ active }) => {
  const { episodes } = useContext(Context);
  const episode = findEpisode(episodes, active);

  if (!episode) return null;

  return (
    <div key={episode.number} className="episodes__details">
      <h2>{episode.title}</h2>
      <h3>{episode.teaser}</h3>
      <Rating {...episode} />
    </div>
  );
};
