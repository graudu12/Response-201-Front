import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./SuccessSaveModal.module.css";

export default function SuccessSaveModal({ isOpen, onClose }) {
  const navigate = useNavigate();

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
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          <svg className={css.closeIcon}>
            <use href={`/svg/sprite.svg#icon-close`} />
          </svg>
        </button>
        <h2 className={css.title}>Done! Recipe saved</h2>
        <p className={css.text}>You can find recipe in our profile</p>
        <button
          className={css.primaryBtn}
          onClick={() => {
            navigate("/profile/own");
            onClose();
          }}
        >
          Go to My profile
        </button>
      </div>
    </div>
  );
}
