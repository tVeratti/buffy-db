import React from 'react';

import Table from '../../../table';
import Rating from './rating';

import './general.scss';

export default ({
  _id,
  title,
  directed_by,
  written_by,
  story_by,
  teleplay_by,
  teaser,
  rating
}) => (
  <div className="details__general">
    <h2 className="details__title">{title}</h2>
    <div className="details__rating">
      <Rating
        _id={_id}
        name="avg"
        rating={rating.average}
        count={rating.count || 0}
        readonly={true}
      />
    </div>

    <div className="details__authors">
      <Table
        rows={[
          { label: 'Directed by', content: directed_by },
          written_by && { label: 'Written by', content: written_by },
          story_by && { label: 'Story by', content: story_by },
          teleplay_by && { label: 'Teleplay by', content: teleplay_by }
        ]}
      />
    </div>
    <h3>{teaser}</h3>
  </div>
);
