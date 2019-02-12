import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import memoize from 'memoize-one';

import { get } from '../../util/api';
import List from './list';
import Details from './details';

class Episodes extends PureComponent {
  static getInitialProps = async ({ req, ...props }) => {
    const res = await get('/api/episodes', req);
    const episodes = await res.json();
    return { episodes };
  };

  find = memoize((list, number) => list.find(e => e.number == number));

  render() {
    const { episodes, router } = this.props;
    const episode = this.find(episodes, router.query.number);

    const title = episode
      ? `Buffy - [${episode.number}] ${episode.title}`
      : `Buffy Episodes List`;

    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        <div className="view episodes">
          <List list={episodes} active={episode} />
          <Details list={episodes} active={episode} />
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Episodes);
