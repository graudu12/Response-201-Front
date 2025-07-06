import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./AuthPromptModal.module.css";

export default function AuthPromptModal({ isOpen, onClose }) {
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
        <button
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            className={css.closeIcon}
            viewBox="0 0 32 32"
            width="24"
            height="24"
          >
            <circle
              cx="16"
              cy="16"
              r="15"
              stroke="black"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M10 10L22 22"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M22 10L10 22"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <h2 className={css.title}>Error while saving</h2>
        <p className={css.text}>
          To save this recipe, you need to authorize first
        </p>

        <div className={css.buttons}>
          <button
            className={css.loginBtn}
            onClick={() => {
              navigate("/login");
              onClose();
            }}
          >
            Log in
          </button>
          <button
            className={css.registerBtn}
            onClick={() => {
              navigate("/register");
              onClose();
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
