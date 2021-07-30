import React from 'react';
import styles from '../styles/Pagination.module.css';

const AppPagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  onNavclick,
}) => {
  let pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.root}>
        <li
          style={{
            display: currentPage === pageNumbers[0] ? 'none' : 'inline-block',
          }}
        >
          <button
            className={`${styles.paginationBtn} ${styles.boldText}`}
            onClick={() => onNavclick('prev')}
          >
            {'<'}
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button
              className={`${styles.paginationBtn} ${
                currentPage === number && styles.boldText
              }`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li
          style={{
            display:
              currentPage === pageNumbers[pageNumbers.length - 1]
                ? 'none'
                : 'inline-block',
          }}
        >
          <button
            className={`${styles.paginationBtn} ${styles.boldText}`}
            onClick={() => onNavclick('next')}
          >
            {'>'}
          </button>
        </li>
      </ul>
    </nav>
  );
};
// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       listStyle: 'none',
//       display: 'flex',
//       justifyContent: 'center',
//     },
//     paginationBtn: {
//       padding: '5px 10px',
//       border: '0px',
//       cursor: 'pointer',
//       fontSize: '20px',
//       color: '#B4B4B4',
//       background: 'transparent',
//       '&:hover': {
//         color: '#fff !important',
//         background: '#000000',
//       },
//     },
//     boldText: {
//       color: '#000000 !important',
//       fontWeight: 'bold',
//     },
//   })
// );
export default AppPagination;
