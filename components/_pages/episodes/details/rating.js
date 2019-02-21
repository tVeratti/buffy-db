import React, { useState } from 'react';
import classnames from 'classnames';

import Star from './star';

import './rating.scss';

export default ({ rating }) => {
  const stars = [...new Array(5)].map((s, i) => {
    return (
      <li key={i}>
        <Star index={i} {...rating} />
      </li>
    );
  });

  return <ul className="rating">{stars}</ul>;
};
