import React, { PureComponent } from 'react';
import fetch from 'isomorphic-unfetch';

import List from './list';
import Details from './details';

export default class Episodes extends PureComponent {
  static getInitialProps = async () => {
    const res = await fetch('/episodes');
    const episodes = await res.json();
    return { episodes };
  };

  render() {
    const { episodes } = this.props;
    return (
      <div className="view episodes">
        <List episodes={episodes} />
        <Details episodes={episodes} />
      </div>
    );
  }
}
