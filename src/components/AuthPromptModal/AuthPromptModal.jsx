import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import css from "./AuthPromptModal.module.css";
import sprite from "../../svg/sprite.svg";

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
        <button className={css.closeBtn} onClick={onClose}>
          <svg className={css.closeIcon}>
            <use href={`${sprite}#icon-close`} />
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
