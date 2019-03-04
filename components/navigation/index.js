import React, { useContext } from 'react';
import Link from 'next/link';

import UserContext from '../userContext';

import './navigation.scss';

const Navigation = () => {
  const user = useContext(UserContext);
  const paths = [
    { label: 'Episodes', to: '/' }
    //{ label: 'Episodes', to: '/episodes' }
  ];

  const pathNodes = paths.map((p, i) => (
    <li key={i} className="nav__item">
      <Link href={p.to} passHref>
        <a>{p.label}</a>
      </Link>
    </li>
  ));

  return (
    <React.Fragment>
      <div className="nav">
        <h1 className="nav__title">
          <span className="buffy">Buffy</span>
          <span>DATABASE</span>
        </h1>
        {/* <ul className="nav__list">{pathNodes}</ul> */}
        {/* prettier-ignore */
        user
          ? <a href="/auth/logout">Logout</a>
          : <a href="/auth/google">Login</a>}
      </div>
    </React.Fragment>
  );
};

export default Navigation;
