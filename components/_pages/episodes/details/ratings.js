import React from 'react';

import Table from '../../../table';
import Rating from './rating';

import './ratings.scss';

export default ({ _id, rating }) => (
  <div className="details__ratings">
    <h4>Ratings</h4>
    <Table
      rows={[
        {
          label: 'Average',
          content: <Rating _id={_id} rating={rating.average} readonly={true} />
        },
        {
          label: 'You',
          content: <Rating _id={_id} rating={rating.user} />
        }
      ]}
    />
  </div>
);
