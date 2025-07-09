import styles from './Pagination.module.css';

export default function Pagination({
  page,
  perPage,
  totalItems,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalItems / perPage);
  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
      onPageChange(newPage);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    pages.push(1);
    if (page > 4) pages.push('...');
    const start = Math.max(2, page - 2);
    const end = Math.min(totalPages - 1, page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 3) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={styles.button}>
        &lt;
      </button>

      {pages.map((num, index) => (
        <button
          key={index}
          onClick={() => typeof num === 'number' && handlePageChange(num)}
          disabled={num === '...'}
          className={`${styles.button} ${num === page ? styles.active : ''}`}>
          {num}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={styles.button}>
        &gt;
      </button>
    </div>
  );
}
