import Link from 'next/link';
import './header.scss';

const Menu = () => {
  const paths = [
    { label: 'Home', to: '/' },
    { label: 'Episodes', to: '/episodes' }
  ];

  const pathNodes = paths.map((p, i) => (
    <li key={i} className="header__item">
      <Link href={p.to}>
        <a>{p.label}</a>
      </Link>
    </li>
  ));

  return (
    <div className="header">
      <ul className="header__list">{pathNodes}</ul>
    </div>
  );
};

export default Menu;
