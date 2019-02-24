import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import { get } from '../util/api';
import Episodes from '../components/_pages/episodes';

class Page extends PureComponent {
  static getInitialProps = async ({ req, ...props }) => {
    const res = await get('/api/episodes', req);
    const episodes = await res.json();

    return { episodes };
  };

  render() {
    const { episodes, router, user } = this.props;
    console.log(user);

    return (
      <React.Fragment>
        <Head>
          <title>Buffy Database</title>
        </Head>
        <Episodes initial={episodes} number={router.query.number} />
      </React.Fragment>
    );
  }
}

export default withRouter(Page);
