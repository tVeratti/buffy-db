import React, { useContext } from 'react';
import padStart from 'lodash/padStart';

import useParallax from '../../../hooks/parallax';
import { Context } from '../context';
import General from './general';

export default ({ content, ...episode }) => {
  const { query } = useContext(Context).router;
  const top = useParallax(-0.5);
  const imageURL = content[episode._id] || content['-1'];

  return (
    <React.Fragment>
      <div
        className="details__image"
        style={{
          backgroundImage: `url('${imageURL}')`,
          backgroundPositionY: top
        }}
      />
      <div className="details__header">
        <div className="details__number">
          ep.# <span>{padStart(episode.number, 3, '0')}</span>
        </div>
        <General {...episode} />
      </div>
    </React.Fragment>
  );
};
