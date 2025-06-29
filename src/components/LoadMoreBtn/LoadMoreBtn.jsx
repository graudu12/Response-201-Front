import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick, children }) {
  return (
    <button className={css.button} onClick={onClick}>
      {children}
    </button>
  );
}
