import React, { useContext, useState, useEffect } from 'react';
import { Placeholder } from 'react-suspense-polyfill';
import memoize from 'memoize-one';
import { flatten, uniq } from 'lodash';
import classnames from 'classnames';

import Loading from '../../../loading';
import { Context } from '../context';
import Seasons from './seasons';
import Episodes from './episodes';

import './index.scss';

const getSeasons = episodes => uniq(flatten(episodes.map(e => e.season)));

const getEpisode = memoize((episodes, number) =>
  episodes.find(e => e.number == number)
);

export default ({ active }) => {
  const { episodes } = useContext(Context).store;
  const [open, setOpen] = useState(false);
  const [blocked, setBlock] = useState(false);

  const seasons = getSeasons(episodes);
  const episode = getEpisode(episodes, active);

  const [season, setSeason] = useState(0);
  useEffect(() => {
    setSeason(episode.season);
    setBlock(true);
    setTimeout(() => setBlock(false), 300);
  }, [active]);

  const sideBarClassName = classnames('episodes__sidebar', {
    'episodes__sidebar--open': open
  });

  return (
    <div className={sideBarClassName}>
      <Placeholder fallback={<Loading />}>
        <Seasons
          seasons={seasons}
          active={season}
          setOpen={setOpen}
          setSeason={setSeason}
        />
        <Episodes
          episodes={episodes}
          active={active}
          season={season}
          blocked={blocked}
          onClick={() => setOpen(false)}
        />
      </Placeholder>
    </div>
  );
};
