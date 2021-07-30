/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import MovieCardComponent from '../components/MovieCardComponent';
import PaginationComponent from '../components/PaginationComponent';
import axios from 'axios';
export default function Home() {
  // top movies list state
  const [moviesList, setMoviesList] = React.useState([]);
  // current page state
  const [currentPage, setCurrentPage] = React.useState(1);
  // total number of pages state
  const [totalPages, setTotalPages] = React.useState(0);
  // total number of pages state
  const [sort, setSort] = React.useState(false);
  // fetch movie handler
  const fectMovieList = async () => {
    // movie url
    const fetchUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=86e04c8b56fc4bc4b40c3e45f058a61d&page=${currentPage}`;
    try {
      const { data } = await axios.get(fetchUrl);
      console.log('dafom2', data);
      if (data.total_pages) {
        // deconstruct response
        const { results, total_results } = data;
        // set movie list
        setMoviesList(results);

        // // set total results to maximum of 500
        setTotalPages(total_results > 500 && 500);
      }
    } catch (e) {
      console.log(e.message, '::: error message ::');
    }
  };
  // sort function
  const sort_by = (field, reverse, primer) => {
    const key = primer
      ? function (x) {
          return primer(x[field]);
        }
      : function (x) {
          return x[field];
        };

    reverse = !reverse ? 1 : -1;

    return function (a, b) {
      return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
    };
  };
  // sort movies in accending or decending order using title
  const sortHandler = () => {
    setSort(!sort);
    const data = moviesList.slice(0).sort(sort_by('title', sort));
    setMoviesList(data);
  };

  // Change current page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // pagination click handler
  const paginationClickHandler = (action) => {
    if (action === 'prev') setCurrentPage(currentPage - 1);
    else if (action === 'next') setCurrentPage(currentPage + 1);
  };
  // fetch movie list on mounted
  useEffect(() => {
    fectMovieList();
  }, []);

  // fetch movie list on mounted
  useEffect(() => {
    fectMovieList();
  }, [currentPage]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Code challenge dafom</title>
        <meta name="description" content="movie code challenge dafom" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div className={styles.headerWrapper}>
          <h1 className={styles.header}>Top Rated Movies</h1>
          <div>
            <span className={styles.sortText}>Sort</span>
            <button className={styles.sortBtn} onClick={() => sortHandler()}>
              <img src="/images/sortIcon.svg" alt="" />
            </button>
          </div>
        </div>
        <div className={styles.movieRow}>
          {moviesList.length > 0 &&
            moviesList.map((movie, index) => (
              <div className={styles.column} key={index}>
                <MovieCardComponent details={movie} />
              </div>
            ))}
        </div>
        <PaginationComponent
          postsPerPage={20}
          totalPosts={totalPages}
          currentPage={currentPage}
          paginate={paginate}
          onNavclick={paginationClickHandler}
        />
      </div>
    </div>
  );
}
