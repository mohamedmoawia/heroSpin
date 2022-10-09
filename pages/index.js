import Head from 'next/head';
import SuperHero from '../components/superHero';
import styles from '../styles/Home.module.scss';
import { Heros } from '../resources/static';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Hero Spin</title>
        <meta name="description" content="Choose Your hero and will pick you a movie" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <section className={styles.hero}>
          <div className={styles.hero__imgContainer}>
            <img src="images/home-hero-img.jpg" className={styles.hero__img} />
            <div className={styles.hero__overlay}>
              <h1>HERO SPIN</h1>
              <p>Choose Your Hero Wisely</p>
            </div>
          </div>
          <div className="indicatorArrow">
            <img className="arrow-img" src="images/down-arrow.png" />
          </div>
        </section>
        {Heros.map((hero, index) => {
          return <SuperHero key={hero.id} name={hero.name} info={hero.info} img={hero.img} color={hero.color} index={index} query={hero.query} />;
        })}
      </main>
      
    </div>
  );
}
