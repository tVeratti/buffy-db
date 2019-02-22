import React, { useContext, useState } from 'react';

import { post } from '../../../../util/api';
import { Context } from '../context';

import Star from './star';

import './rating.scss';

let timeout;

export default ({ _id, rating }) => {
  const { dispatch } = useContext(Context);
  const [hover, setState] = useState(-1);

  const reset = () => setState(-1);

  const stars = [...new Array(5)].map((s, i) => {
    const index = i + 1;
    const onHover = () => setState(index);
    const onClick = () => {
      post({
        url: '/api/episodes/rate',
        body: { _id, rating: index }
      })
        .then(res => res.json())
        .then(res => {
          dispatch({ type: 'RECEIVE_EPISODE', episode: res[0] });
        });
    };

    return (
      <Star
        key={index}
        index={index}
        hoverIndex={hover}
        onClick={onClick}
        onHover={onHover}
        {...rating}
      />
    );
  });

  return (
    <div className="rating" onMouseLeave={reset}>
      {stars}
    </div>
  );
};
