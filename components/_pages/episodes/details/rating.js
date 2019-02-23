import React, { useContext, useState } from 'react';

import { Context } from '../context';
import { rate } from '../actions';

import Star from './star';

import './rating.scss';

export default ({ _id, rating, readonly }) => {
  const { dispatch } = useContext(Context);
  const [hover, setState] = useState(-1);

  const reset = () => setState(-1);

  const stars = [...new Array(5)].map((s, i) => {
    const index = i + 1;
    const onHover = () => setState(index);
    const onClick = () => rate(_id, index, dispatch);

    return (
      <Star
        key={index}
        rating={index}
        hoverIndex={hover}
        onClick={!readonly && onClick}
        onHover={!readonly && onHover}
        activeRating={rating}
        readonly={readonly}
      />
    );
  });

  return (
    <form className="rating" onMouseLeave={reset}>
      {stars}
      <button type="submit" hidden>
        Submit rating
      </button>
    </form>
  );
};
