import React from 'react';
import App, { Container } from 'next/app';
import { NextAuth } from 'next-auth/client';

import './_reset.scss';
import './_app.scss';

import Navigation from '../components/navigation';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx, req }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    const session = await NextAuth.init({ req });

    return {
      pageProps,
      session
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <div className="app">
          <Navigation />
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}
