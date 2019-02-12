import React, { PureComponent } from 'react';

export default class Details extends PureComponent {
  render() {
    const { active: episode } = this.props;
    if (!episode) return null;

    return (
      <div className="episodes__details">
        <h2>{episode.title}</h2>
        <h3>{episode.teaser}</h3>
      </div>
    );
  }
}
