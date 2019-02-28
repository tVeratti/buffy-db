import React, { useContext, useState, useEffect } from 'react';
import { Placeholder } from 'react-suspense-polyfill';
import memoize from 'memoize-one';
import { flatten, uniq } from 'lodash';

import Loading from '../../../loading';
import { Context } from '../context';
import Filter from '../../../icons/filter';
import Season from './season';
import Episode from './episode';

import './index.scss';
import Arrow from '../../../arrow';

const getSeasons = memoize(episodes =>
  uniq(flatten(episodes.map(e => e.season)))
);

const getFirstEpisode = memoize(
  (episodes, season) => episodes.filter(e => e.season == season)[0] || {}
);

const getEpisodes = memoize((episodes, season, filter) =>
  episodes.filter(
    e =>
      e.season == season &&
      (!filter || e.title.toLowerCase().includes(filter.toLowerCase()))
  )
);

const setArrowTop = () => {
  if (typeof window === 'undefined') return;

  const episode = document.querySelector('.episode--active');
  const arrow = document.querySelector('.episodes__list .arrow');

  if (!episode) {
  } else {
    const { offsetHeight, offsetTop } = episode.parentElement;
    arrow.style.top = offsetTop + offsetHeight / 2 + 'px';
    arrow.style.opacity = 1;
  }
};

export default ({ active }) => {
  const [season, setSeason] = useState(1);
  const [filter, setFilter] = useState('');
  const { store } = useContext(Context);

  const seasons = [1, 2, 3, 4, 5, 6, 7]; //getSeasons(store.episodes);
  const episodes = getEpisodes(store.episodes, season, filter);

  useEffect(setArrowTop, [active, season]);

  return (
    <div className="episodes__sidebar">
      <Placeholder fallback={<Loading />}>
        <ul className="episodes__seasons">
          {seasons.map(s => {
            const first = getFirstEpisode(store.episodes, s).number;

            return (
              <Season
                key={s}
                season={s}
                first={first}
                isActive={s == season}
                setState={setSeason}
              />
            );
          })}
        </ul>
        <ul className="episodes__list">
          <li className="episodes__filter-wrapper">
            <input
              className="episodes__filter"
              onInput={e => setFilter(e.target.value)}
            />
            <Filter />
          </li>
          {episodes.map((e, i) => (
            <Episode
              key={e.number}
              index={i}
              isActive={e.number == active}
              {...e}
            />
          ))}
          <Arrow />
        </ul>
      </Placeholder>
    </div>
  );
};
