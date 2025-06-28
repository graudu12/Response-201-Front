import css from "./NotFound.module.css";

const NotFound = ({ onRetry }) => {
  return (
    <div className={css.backdrop} onClick={onRetry}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        <button className={css.closeBtn} onClick={onRetry} aria-label="Close">
          ✕
        </button>
        <p className={css.title}>Error</p>
        <p className={css.message}>
          Recipe not found. It may have been deleted.
        </p>
        <button className={css.backButton} onClick={onRetry}>
          Retry
        </button>
      </div>
    </div>
  );
};

export default NotFound;
