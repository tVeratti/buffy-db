import Link from 'next/link';
import './navigation.scss';

const Navigation = () => {
  const paths = [
    { label: 'Home', to: '/' },
    { label: 'Episodes', to: '/episodes' }
  ];

  const pathNodes = paths.map((p, i) => (
    <li key={i} className="nav__item">
      <Link href={p.to} passHref>
        <a>{p.label}</a>
      </Link>
    </li>
  ));

  return (
    <div className="nav">
      <ul className="nav__list">{pathNodes}</ul>
    </div>
  );
};

export default Navigation;