import React from 'react';
import App, { Container } from 'next/app';
import { parseCookies } from 'nookies';

import './_reset.scss';
import './_app.scss';

import Navigation from '../components/navigation';
import UserContext from '../components/userContext';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    const { user = '' } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ...ctx, user });
    }

    return { pageProps, user };
  }

  render() {
    const { Component, pageProps, user } = this.props;

    return (
      <Container>
        <div className="app">
          <UserContext.Provider value={user}>
            {/* <Navigation /> */}
            <Component {...pageProps} />
          </UserContext.Provider>
        </div>
      </Container>
    );
  }
}
