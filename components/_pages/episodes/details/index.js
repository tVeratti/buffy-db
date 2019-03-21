import React, { useContext, useState, useEffect } from 'react';
import memoize from 'memoize-one';

import usePrevious from '../../../hooks/previous';
import Split from '../../../split';
import Table from '../../../table';
import { Context } from '../context';
import Image from './image';
import Ratings from './ratings';
import './index.scss';

const findEpisode = memoize((episodes, number) =>
  episodes.find(e => e.number == number)
);

export default ({ active, season }) => {
  const { episodes, content } = useContext(Context).store;
  const prevActive = usePrevious(active);
  const episode = findEpisode(episodes, active);

  if (!episode)
    return (
      <div className="episodes__details">
        <div className="episodes__select">Select an episode!</div>
      </div>
    );

  const prev = findEpisode(episodes, prevActive);

  return (
    <div className="episodes__details details">
      <Split
        headers={[
          <Image {...prev} content={content} />,
          <Image {...episode} content={content} />
        ]}
      />
      <div className="details__main">
        <div className="details__section">
          <h4>Your Rating</h4>
          <Ratings {...episode} />
        </div>
        <div className="details__section">
          <h4>Details</h4>
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
        </div>
      </div>
    </div>
  );
};
