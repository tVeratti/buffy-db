import React, { PureComponent } from 'react';

export default class Episode extends PureComponent {
  render() {
    const { ...ep } = this.props;
    return (
      <div className="episode">
        <div>{ep.title}</div>
      </div>
    );
  }
}
