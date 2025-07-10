import { useState, useEffect } from "react";
import styles from "./Pagination.module.css";

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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
      //  Mobile view: current ± 2 (5 total if possible)
      if (totalPages <= 6) {
        for (let i = 1; i <= totalPages; i++) pages.push(i);
      } else if (page <= 3) {
        for (let i = 1; i <= 6; i++) pages.push(i);
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - 5; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = page - 2; i <= page + 3; i++) pages.push(i);
      }
    } else {
      //  Desktop view: full logic with ellipses
      pages.push(1);

      if (page > 4) pages.push("...");

      const start = Math.max(2, page - 2);
      const end = Math.min(totalPages - 1, page + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - 3) pages.push("...");

      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`${styles.button} ${styles.arrow}`}
      >
        <svg className={styles.logoIcon} viewBox="0 0 16 10" aria-hidden="true">
          <use href={`/svg/sprite.svg#icon-left`} />
        </svg>
      </button>
      {pages.map((num, index) => {
        const isDots = num === "...";

        return (
          <button
            key={index}
            onClick={() => typeof num === "number" && handlePageChange(num)}
            disabled={isDots}
            className={`${styles.button} ${num === page ? styles.active : ""} ${
              isDots ? styles.dots : ""
            }`}
          >
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
        className={`${styles.button} ${styles.arrow}`}
      >
        <svg
          className={styles.logoIcon}
          viewBox="0 0 16 10"
          aria-hidden="true"
        >
          <use href={`/svg/sprite.svg#icon-right`} />
        </svg>
      </button>
    </div>
  );
}
