import React, { useContext } from 'react';
import memoize from 'memoize-one';
import padStart from 'lodash/padStart';

import { Context } from '../context';
import General from './general';
import Ratings from './ratings';

import './index.scss';

const findEpisode = memoize((episodes, number) =>
  episodes.find(e => e.number == number)
);

export default ({ active }) => {
  const { episodes, content } = useContext(Context).store;
  const episode = findEpisode(episodes, active);

  if (!episode) return null;

  return (
    <div key={episode.number} className="episodes__details details">
      <div
        className="details__background"
        style={{ backgroundImage: `url(${content[episode._id]})` }}
      />
      <div className="details__header">
        <div className="details__number">
          ep.# <span>{padStart(episode.number, 3, '0')}</span>
        </div>
        <General {...episode} />
      </div>

      <div className="details__section">
        <Ratings {...episode} />
      </div>
    </div>
  );
};
