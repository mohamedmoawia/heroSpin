import { useRouter } from 'next/router';
import axios from 'axios';

import { APIkey } from '../../../../resources/static';
import styles from '../../../../styles/movie.module.scss';

const Movie = ({ movie }) => {
  console.log('MOVIE: ', movie);
  // HOOKS
  const router = useRouter();
  // ROUTER PARAMS
  const { id } = router.query;
  //RENDER
  return (
    <div className={styles.movieDetails}>
      <header className={styles.movieDetails__header}>
        <img src={movie.Poster} />
        <div className={styles.side}>
          <h2 className={styles.title}>{movie.Title}</h2>
          <p>{movie.Year}</p>
          <div className={styles.ratingContainer}>
            <div className={styles.rating}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                id="iconContext-star"
                viewBox="0 0 24 24"
                fill="gold"
                role="presentation"
              >
                <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
              </svg>
              <span className={styles.ratingText}>{movie.imdbRating}</span>
              <span>/10</span>
            </div>
            <div className={styles.votes}>
              <span className={styles.ratingText}>{movie.imdbVotes}</span>
              <span>&nbsp;Votes</span>
            </div>
          </div>
          <div className={styles.runtime}>
            <span>{movie.Runtime}</span>
          </div>
          {/* <div className={styles.country}>
              <span>{movie.Country}</span>
          </div> */}
          <div className={styles.genreContainer}>
            {movie.Genre.split(',').map((genre) => {
              return (
                <div key={genre} className={styles.tag}>
                  <span>{genre}</span>
                </div>
              );
            })}
          </div>
          <div className={styles.plot}>
            <p>{movie.Plot}</p>
          </div>
        </div>
      </header>
      <main className={styles.movieDetails__body}>
        <div className={styles.infoContainer}>
          <h2>Actors</h2>
          <div className={styles.info}>
            {movie.Actors.split(',').map((el) => {
              return (
                <div key={el} className={styles.tag}>
                  <span>{el}</span>
                </div>
              );
            })}
          </div>
          <h2>Directors</h2>
          <div className={styles.info}>
            {movie.Director.split(',').map((el) => {
              return (
                <div key={el} className={styles.tag}>
                  <span>{el}</span>
                </div>
              );
            })}
          </div>
          <h2>Writers</h2>
          <div className={styles.info}>
            {movie.Writer.split(',').map((el) => {
              return (
                <div key={el} className={styles.tag}>
                  <span>{el}</span>
                </div>
              );
            })}
          </div>
          <h2>Languages</h2>
          <div className={styles.info}>
            {movie.Language.split(',').map((el) => {
              return (
                <div key={el} className={styles.tag}>
                  <span>{el}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.boxOffice}>
            <p>BoxOffice</p>
            <h2>{movie.BoxOffice}</h2>
        </div>
      </main>
    </div>
  );
};

export const getStaticProps = async ({ params }) => {
  const { id } = params;

  const response = await axios({
    url: `http://www.omdbapi.com/?apikey=${APIkey}&`,
    method: 'GET',
    params: {
      i: id
    }
  });

  return {
    props: {
      movie: response.data
    }
  };
};
export const getStaticPaths = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  };
};

export default Movie;
