import React, { useEffect, useState } from 'react';
import memoize from 'memoize-one';

import Filter from '../../../icons/filter';
import Episode from './episode';

import Arrow from '../../../arrow';

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

export default ({ episodes: all, active, season }) => {
  const [filter, setFilter] = useState('');
  const episodes = getEpisodes(all, season, filter);
  useEffect(setArrowTop, [active, season]);

  return (
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
  );
};
