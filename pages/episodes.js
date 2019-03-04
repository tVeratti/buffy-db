import React, { PureComponent } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import { get } from '../util/api';
import Episodes from '../components/_pages/episodes';

const mapContent = initial => {
  const content = {};
  initial.items.forEach(c => {
    try {
      content[c.fields.id] = c.fields.screenshot.fields.file.url;
    } catch (err) {}
  });
  return content;
};

class Page extends PureComponent {
  static getInitialProps = async ({ req, user, ...props }) => {
    const res = await get('/api/episodes', req, user);
    const { episodes, content } = await res.json();

    return { episodes, content: mapContent(content) };
  };

  render() {
    const { episodes, content, router } = this.props;

    return (
      <React.Fragment>
        <Head>
          <title>Buffy Database</title>
        </Head>
        <Episodes
          initial={{ episodes, content }}
          number={router.query.number}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Page);
