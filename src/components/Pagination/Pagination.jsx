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
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    let left = page - 1;
    let right = page + 1;

    if (page <= 3) {
      left = 2;
      right = 4;
    }
    if (page >= totalPages - 2) {
      left = totalPages - 3;
      right = totalPages - 1;
    }

    if (left > 2) {
      pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);
  }

  return (
    <div>
      <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
        <div style={{ "--color1": "red" }}>
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <use href="/svg/sprite.svg#icon-left" />
          </svg>
        </div>
      </button>

      {pages.map((num) => (
        <button key={num} onClick={() => handlePageChange(num)}>
          {num}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        <div style={{ "--color1": "red" }}>
          <svg width="24" height="24" fill="none" stroke="currentColor">
            <use href="/svg/sprite.svg#icon-right" />
          </svg>
        </div>
      </button>
    </div>
  );
}
