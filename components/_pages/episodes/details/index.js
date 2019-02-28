import React, { useContext } from 'react';
import memoize from 'memoize-one';
import padStart from 'lodash/padStart';

import Table from '../../../table';
import { Context } from '../context';
import General from './general';
import Ratings from './ratings';

import './index.scss';

const findEpisode = memoize((episodes, number) =>
  episodes.find(e => e.number == number)
);

export default ({ active, season }) => {
  const { episodes } = useContext(Context).store;
  const episode = findEpisode(episodes, active);

  if (!episode)
    return (
      <div className="episodes__details">
        <div className="episodes__select">Select an episode!</div>
      </div>
    );

  return (
    <div key={episode.number} className="episodes__details details">
      <div className="details__header">
        <div className="details__number">
          ep.# <span>{padStart(episode.number, 3, '0')}</span>
        </div>
        <General {...episode} />
      </div>
      <div className="details__main">
        <Table
          rows={[
            { label: 'Season', content: episode.season },
            {
              label: 'Air Date',
              content:
                episode.air_date && new Date(episode.air_date).toDateString()
            },
            { label: 'Viewers', content: episode.us_viewers }
          ]}
        />
        <h4>Your Rating</h4>
        <Ratings {...episode} />
      </div>
    </div>
  );
};
