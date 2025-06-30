import styles from "./RecipeCard.module.css";
import sprite from "../../svg/sprite.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RecipeCard = ({ recipe, onToggleFavorite }) => {
  const { _id, thumb, title, description, calories, isFavorite, time } = recipe;
  const isLoggedIn = useSelector(() => true); // потом добавь вместо функции true, selectIsLoggedIn
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      navigate("/auth/login");
      return;
    }
    onToggleFavorite(_id, !isFavorite);
  };

  return (
    <div className={styles.recipeCard}>
      <img src={thumb} alt={title} className={styles.imageCard} />
      <div className={styles.recipeForm}>
        <h3 className={styles.recipeTitle}>{title}</h3>
        {time && (
          <div className={styles.recipeTitleTime}>
            <svg
              className={styles.icon}
              width="32"
              height="32"
              viewBox="0 0 32 32"
            >
              <use href={`${sprite}#icon-cooktime`} />
            </svg>
            <span>{time}</span>
          </div>
        )}
      </div>
      <div className={styles.recipeDescCal}>
        <p className={styles.recipeDescription}>{description}</p>

        <p className={styles.recipeDescription}> - {calories} cals</p>
      </div>
      <div className={styles.formButton}>
        <button
          className={styles.learnMoreButton}
          onClick={() => navigate(`/recipes/${_id}`)}
        >
          Learn More
        </button>

        <button
          className={isFavorite ? styles.favoriteActive : styles.favorite}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <svg
            className={styles.icon}
            width="20"
            height="20"
            viewBox="0 0 32 32"
          >
            <use
              href={`${sprite}#${isFavorite ? "icon-delete" : "icon-saved"}`}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
