import React, { PureComponent } from 'react';

export default class Details extends PureComponent {
  render() {
    const { episodes } = this.props;
    return (
      <div className="episodes__details">
        <div>title</div>
      </div>
    );
  }
}
