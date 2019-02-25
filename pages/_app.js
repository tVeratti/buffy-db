import React from 'react';
import App, { Container } from 'next/app';
import jwt from 'jsonwebtoken';

import './_reset.scss';
import './_app.scss';

import Navigation from '../components/navigation';

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx, req }) {
    let pageProps = {},
      user;

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    try {
      if (ctx.req && ctx.req.cookies) {
        user = jwt.decode(ctx.req.cookies.user).id;
      }
    } catch (err) {}

    return {
      pageProps,
      user
    };
  }

  render() {
    const { Component, pageProps, user } = this.props;

    return (
      <Container>
        <div className="app">
          <Navigation user={user} />
          <Component {...pageProps} />
        </div>
      </Container>
    );
  }
}
