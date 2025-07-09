import { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

export default function Pagination({
  page,
  perPage,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / perPage);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    if (totalPages <= 1) return pages;

    if (isMobile) {
      if (page > 1) pages.push(page - 1);
      pages.push(page);
      if (page < totalPages) pages.push(page + 1);
    } else {
      pages.push(1);
      if (page > 4) pages.push('...');
      const start = Math.max(2, page - 2);
      const end = Math.min(totalPages - 1, page + 2);
      for (let i = start; i <= end; i++) pages.push(i);
      if (page < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`${styles.button} ${styles.arrow}`}>
        &lt;
      </button>
      {pages.map((num, index) => {
        const isDots = num === '...';

        return (
          <button
            key={index}
            onClick={() => typeof num === 'number' && handlePageChange(num)}
            disabled={isDots}
            className={`${styles.button} ${num === page ? styles.active : ''} ${
              isDots ? styles.dots : ''
            }`}>
            {num}
          </button>
        );
      })}
      {/* 
      {pages.map((num, index) => (
        <button
          key={index}
          onClick={() => typeof num === 'number' && handlePageChange(num)}
          disabled={num === '...'}
          className={`${styles.button} ${num === page ? styles.active : ''}`}>
          {num}
        </button>
      ))} */}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`${styles.button} ${styles.arrow}`}>
        &gt;
      </button>
    </div>
  );
}
