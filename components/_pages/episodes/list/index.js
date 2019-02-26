import React, { useContext, useState } from 'react';
import { Placeholder } from 'react-suspense-polyfill';
import memoize from 'memoize-one';
import classnames from 'classnames';
import { flatten, uniq } from 'lodash';

import Loading from '../../../loading';
import { Context } from '../context';
import Episode from './episode';

import './index.scss';

const getSeasons = memoize(episodes =>
  uniq(flatten(episodes.map(e => e.season)))
);

const getEpisodes = memoize((episodes, season) =>
  episodes.filter(e => e.season == season)
);

export default ({ active }) => {
  const [season, setState] = useState(1);
  const { store } = useContext(Context);

  const seasons = getSeasons(store.episodes);
  const episodes = getEpisodes(store.episodes, season);

  const seasonClassName = s =>
    classnames('episodes__season', {
      'episodes__season--active': season == s
    });

  return (
    <div className="episodes__sidebar">
      <Placeholder fallback={<Loading />}>
        <ul className="episodes__seasons">
          {seasons.map(s => (
            <li key={s}>
              <button
                className={seasonClassName(s)}
                onClick={() => setState(s)}
              >
                {s}
              </button>
            </li>
          ))}
        </ul>
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
    </div>
  );
};
