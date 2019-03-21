import React, { useContext } from 'react';

import Navigation from '../../navigation';
import { Provider } from './context';
import List from './list';
import Details from './details';

import './index.scss';

export default ({ router, initial }) => {
  const number = router.query.number;

  return (
    <Provider initial={initial} router={router}>
      <div className="view episodes">
        <List active={number} />
        <Details active={number} />
      </div>
    </Provider>
  );
};
