import { useEffect } from "react";
import css from "./LogoutModal.module.css";

export default function LogoutModal({ isOpen, onClose, onLogout }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href={`/svg/sprite.svg#icon-close`} />
          </svg>
        </button>
        <h2 className={css.title}>Are you sure?</h2>
        <p className={css.text}>We will miss you!</p>
        <div className={css.buttons}>
          <button className={css.logoutBtn} onClick={onLogout}>
            Log out
          </button>
          <button className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
