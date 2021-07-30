/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from '../styles/MovieCard.module.css';
import { useRouter } from 'next/router';
const MovieCardComponent = ({ details }) => {
  // router
  const router = useRouter();
  // isFavorite state
  const [isFavorite, setIsFavorite] = React.useState(false);
  //    set staricon handler
  const setStarIconHandler = (name, value) => {
    //   get items from local storage
    const favorite_movies =
      JSON.parse(localStorage.getItem('favorite_movies')) || {};
    // mutate object with new value
    favorite_movies[name] = value;
    console.log(favorite_movies, '::: favorite_movies ::::');

    // set mutate object in local storage
    localStorage.setItem(
      'favorite_movies',
      JSON.stringify({ ...favorite_movies })
    );
    setIsFavorite(value);
  };

  // parse date handler
  const dateHandler = (date) => {
    return new Date(date).toDateString();
  };
  //   // route to movie details view
  //   const routeToMobile = () => {};
  return (
    <div
      className={`${styles.movieCardWrapper} ${
        isFavorite ? styles.backgroundActive : styles.background
      }`}
    >
      <div
        onClick={() => {
          router.push({
            pathname: '/[movie]',
            query: { movie: details.id },
          });
        }}
      >
        <div className={styles.imageWrapper}>
          <img
            src={`http://image.tmdb.org/t/p/w185${details?.poster_path}`}
            alt=""
            className={styles.img}
          />
        </div>
        <div className={styles.detailsWrapper}>
          <h3 className={styles.title}>{details.title}</h3>
          <p className={styles.subInfo}>
            <b>Ratings: </b>
            {details?.vote_average}
          </p>
          <p className={styles.subInfo}>
            <b>Released: </b>
            {dateHandler(details?.release_date)}
          </p>
          {/* <div className={styles.detailsRating}>
            <span className={styles.subInfo}>
              <b>Ratings: </b>
              {details?.vote_average}
            </span>
            <span className={styles.subInfo}>
              <b>Released: </b>
              {dateHandler(details?.release_date)}
            </span>
          </div> */}
        </div>
      </div>
      <button
        className={styles.startBtn}
        onClick={() => setStarIconHandler(details?.title, !isFavorite)}
      >
        <img
          className={styles.startBtnImg}
          src={!isFavorite ? '/images/star.svg' : '/images/staractive.svg'}
          alt=""
        />
      </button>
    </div>
  );
};
export default MovieCardComponent;
