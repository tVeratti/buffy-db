import React from 'react';
import Rating from './rating';

export default ({ active: episode }) => {
  if (!episode) return null;

  return (
    <div key={episode.number} className="episodes__details">
      <h2>{episode.title}</h2>
      <h3>{episode.teaser}</h3>
      <Rating {...episode} />
    </div>
  );
};
