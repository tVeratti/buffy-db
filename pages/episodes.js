import React, { PureComponent, useReducer } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import memoize from 'memoize-one';

import { get } from '../../util/api';
import Episodes from '../components/_pages/episodes';

class Page extends PureComponent {
  static getInitialProps = async ({ req, ...props }) => {
    const res = await get('/api/episodes', req);
    const episodes = await res.json();
    return { episodes };
  };

  render() {
    const { episodes: initial, router } = this.props;

    const title = episode
      ? `Buffy - [${episode.number}] ${episode.title}`
      : `Buffy Episodes List`;

    return (
      <React.Fragment>
        <Head>
          <title>{title}</title>
        </Head>
        <Episodes number={router.query.number} />
      </React.Fragment>
    );
  }
}

export default withRouter(Page);
