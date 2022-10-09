import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

import axios from 'axios';

import { APIkey } from '../../../resources/static';
import styles from '../../../styles/movies.module.scss';

const HeroName = ({ movies }) => {
  // STATES
  const [selected, setSelected] = useState(null);
  const [final, setFinal] = useState(null);
  // HOOKS
  const router = useRouter();
  // ROUTER PARAMS
  const { heroName } = router.query;

  console.log(router, movies);

  //MOTHODS
  const runRandom = () => {
    let number = null;
    setFinal(null);
    const intervalKey = setInterval(() => {
      number = Math.floor(Math.random() * movies.length);
      setSelected(number);
    }, 300);
    setTimeout(() => {
      setFinal(number);
      clearInterval(intervalKey);
    }, 300 * movies.length);
  };

  // EFFECTS
  useEffect(() => {
    runRandom();
  }, []);

  // RENDER
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button className={styles.spin} onClick={runRandom}>
          Spin
        </button>
        <button
          onClick={() => {
            router.back();
          }}
          className={styles.choose}
        >
          Change Hero
        </button>
      </div>
      <div className={styles.body}>
        <div className={styles.movies}>
          {movies.map((movie, index) => {
            return (
              <div className={styles.movie} key={movie.imdbID}>
                <div>
                  {selected !== index && <div className={styles.movie__overlay}></div>}
                  <div className={styles.movie__imgContainer}>
                    <img src={movie.Poster} />
                  </div>
                </div>
                {final === index && (
                  <div className={styles.movie__details}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                    <Link href={`${router.asPath}/movie/${movie.imdbID}`}>See More</Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { heroName } = params;

  const response = await axios({
    url: `http://www.omdbapi.com/?apikey=${APIkey}&`,
    method: 'GET',
    params: {
      s: heroName,
      type: 'movie'
    }
  });

  return {
    props: {
      movies: response.data.Search
    }
  };
};
export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  };
};
export default HeroName;
