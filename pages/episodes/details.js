import React, { PureComponent } from 'react';

export default class Details extends PureComponent {
  render() {
    const { ...ep } = this.props;
    return (
      <div className="details">
        <div>{ep.title}</div>
      </div>
    );
  }
}
