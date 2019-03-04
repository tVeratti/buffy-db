import { useState, useEffect } from 'react';

export default function useParallax(speed) {
  const [top, setTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { pageYOffset } = window;
      const offset = -pageYOffset * speed;
      const top = `${offset}px`;

      setTop(top);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return top;
}
