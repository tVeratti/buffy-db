import React, { useContext } from 'react';

import { Provider } from './context';
import List from './list';
import Details from './details';

import './index.scss';

export default ({ number, initial }) => {
  return (
    <Provider initial={initial}>
      <div className="view episodes">
        <List active={number} />
        <Details active={number} />
      </div>
    </Provider>
  );
};