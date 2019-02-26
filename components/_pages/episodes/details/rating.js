import React, { useContext, useState } from 'react';

import { Context } from '../context';
import { rate } from '../actions';

import Star from './star';

import './rating.scss';

export default ({ _id, name, rating, count, readonly }) => {
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
        name={name}
        rating={index}
        hoverIndex={hover}
        onClick={onClick}
        onHover={onHover}
        activeRating={rating}
        readonly={readonly}
      />
    );
  });

  return (
    <form className="rating" onMouseLeave={reset}>
      {stars}
      {count !== undefined && <span className="subtle">{count} ratings</span>}
      <button type="submit" hidden>
        Submit rating
      </button>
    </form>
  );
};
