import React, { PureComponent, useReducer } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import memoize from 'memoize-one';

import { get } from '../../util/api';
import { Provider, Context } from './context';
import List from './list';
import Details from './details';

export default class Episodes extends PureComponent {
  find = memoize((episodes, number) => episodes.find(e => e.number == number));

  render() {
    const { number } = this.props;
    const { store, dispatch } = useContext(Context);
    const episode = this.find(store, number);

    return (
      <Provider>
        <div className="view episodes">
          <List list={store} active={episode} />
          <Details list={store} active={episode} />
        </div>
      </Provider>
    );
  }
}
