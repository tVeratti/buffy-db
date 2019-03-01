import React, { useContext } from 'react';
import { Placeholder } from 'react-suspense-polyfill';
import memoize from 'memoize-one';
import { flatten, uniq } from 'lodash';

import Loading from '../../../loading';
import { Context } from '../context';
import Seasons from './seasons';
import Episodes from './episodes';

import './index.scss';

const flattenSeasons = episodes => uniq(flatten(episodes.map(e => e.season)));
const getFirstEpisode = (episodes, season) =>
  episodes.filter(e => e.season == season)[0] || {};

const getSeasons = memoize(episodes =>
  flattenSeasons(episodes).map(s => ({
    number: s,
    first: getFirstEpisode(episodes, s)
  }))
);

const getEpisode = memoize((episodes, number) =>
  episodes.find(e => e.number == number)
);

export default ({ active }) => {
  const { episodes } = useContext(Context).store;

  const seasons = getSeasons(episodes);
  const episode = getEpisode(episodes, active);
  const season = (episode && episode.season) || 1;

  return (
    <div className="episodes__sidebar">
      <Placeholder fallback={<Loading />}>
        <Seasons seasons={seasons} active={season} />
        <Episodes episodes={episodes} active={active} season={season} />
      </Placeholder>
    </div>
  );
};
