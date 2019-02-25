import React from 'react';

import './table.scss';

const Row = ({ label, content }) => (
  <div className="table__row">
    <span className="table__cell">{label}</span>
    <span className="table__cell">{content}</span>
  </div>
);

export default ({ rows }) => {
  return (
    <div className="table">
      {rows.map((row, i) => (
        <Row key={i} {...row} />
      ))}
    </div>
  );
};
