import React, { PureComponent } from 'react';

import { get } from '../../util/api';
import List from './list';
import Details from './details';

export default class Episodes extends PureComponent {
  static getInitialProps = async ({ req, ...props }) => {
    const res = await get('/api/episodes', req);
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
