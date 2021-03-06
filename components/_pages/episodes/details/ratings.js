import React, { useContext } from 'react';

import UserContext from '../../../userContext';
import Rating from './rating';

import './ratings.scss';

export default ({ _id, rating }) => {
  const user = useContext(UserContext);
  return (
    <div className="details__ratings">
      {user && <Rating _id={_id} name="you" rating={rating.user} />}
      {!user && <a href="/auth/google">Login to vote!</a>}
    </div>
  );
};
