import Link from 'next/link';

import styles from '../styles/Home.module.scss';

const SuperHero = ({ name, img, info, color, index , query}) => {
  return (
    <section className={styles.superHero} style={{ backgroundColor: color, flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>
      <div className={styles.side}>
        <img className={styles.superHero__img} src={img} />
      </div>
      <div className={styles.side}>
        <h2>{name}</h2>
        <p>{info}</p>
        <Link href={`/movies/${query}`}>Pick a movie</Link>
      </div>
    </section>
  );
};

export default SuperHero;
