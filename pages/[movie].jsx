/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/MovieDetails.module.css';
const MovieList = ({}) => {
  //  get query
  const { movie } = useRouter().query;
  // movie state
  const [movieState, setMovieState] = React.useState({});
  // fecth movie by id
  const fecthMovieById = async () => {
    const url = `
    https://api.themoviedb.org/3/movie/${movie}?api_key=86e04c8b56fc4bc4b40c3e45f058a61d&language=en-US`;
    try {
      const { data } = await axios.get(url);
      // set movie state
      setMovieState(data);
    } catch (e) {
      console.log(e.message, ':::: error message ::::');
    }
  };
  // currency formatter
  const currencyFormatter = (value) => {
    return value?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  };
  // get percentage
  const getPercentage = (value) => {
    return `${Math.round((value / 10) * 100)}%`;
  };
  // fetch data by id on mounted
  React.useEffect(() => {
    fecthMovieById();
  }, []);
  return (
    <div
      className={styles.detailsWrapper}
      style={{
        backgroundImage: `url(http://image.tmdb.org/t/p/w185${movieState?.backdrop_path})`,
      }}
    >
      <div className={styles.layer}></div>
      <div className={styles.bodyWrapper}>
        <div className={styles.posterImageWrapper}>
          <img
            src={`http://image.tmdb.org/t/p/w185${movieState?.poster_path}`}
            alt=""
            className={styles.posterImage}
          />
        </div>
        <div className={styles.description}>
          <h1>{movieState.title}</h1>
          <i>{`"${movieState.tagline}"`}</i>
          <h3>Overview</h3>
          <p>{movieState.overview}</p>
          <div className={styles.details}>
            <div className={styles.col}>
              <h3>Realease Date</h3>
              <p>{movieState.release_date}</p>
              <h3>Popularity</h3>
              <p>{movieState.popularity}</p>
              <h3>Genre</h3>
              <p>{movieState?.genres?.map((item) => `${item.name},`)}</p>
            </div>
            <div className={styles.col}>
              <h3>Average Vote</h3>
              <p>{getPercentage(movieState.vote_average)}</p>
              <h3>Total Votes</h3>
              <p>{movieState.vote_count}</p>
              <h3>Original Language</h3>
              <p>{movieState.original_language}</p>
            </div>
            <div className={styles.col}>
              <h3>Budget</h3>
              <p>{currencyFormatter(movieState.budget)}</p>
              <h3>Revenue</h3>
              <p>{currencyFormatter(movieState.revenue)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieList;
