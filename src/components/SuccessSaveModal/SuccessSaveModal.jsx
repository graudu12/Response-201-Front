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
          <svg
            className={css.closeIcon}
            viewBox="0 0 32 32"
            width="24"
            height="24"
          >
            <path
              d="M10 10L22 22"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d="M22 10L10 22"
              stroke="black"
              strokeWidth="1"
              strokeLinecap="round"
            />
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
        <button
          className={css.primaryBtn}
          onClick={() => {
            navigate("/");
            onClose();
          }}
        >
          Go to Recipes
        </button>
      </div>
    </div>
  );
}
