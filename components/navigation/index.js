import React, { useContext } from 'react';
import Link from 'next/link';

import Context from '../context';

import './navigation.scss';

const Navigation = () => {
  const { user } = useContext(Context);

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
      <div className="header">Buffy DB</div>
      <div className="nav">
        {/* <ul className="nav__list">{pathNodes}</ul> */}
        <ul className="nav__user">
          <li className="nav__item">
            {/* prettier-ignore */
            user
            ? <a href="/auth/logout">Logout</a>
            : <a href="/auth/google">Login</a>}
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};

export default Navigation;
