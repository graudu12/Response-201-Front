import styles from "./RecipeCard.module.css";
import sprite from "../../svg/sprite.svg";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useNavigate } from "react-router-dom";
const RecipeCard = ({ recipe }) => {
  const { _id, thumb, title, description, calories, time } = recipe;
  const navigate = useNavigate();
  return (
    <div className={styles.recipeCard}>
      <img src={thumb} alt={title} className={styles.imageCard} />
      <div className={styles.recipeForm}>
        <h3 className={styles.recipeTitle}>{title}</h3>
        {time && (
          <div className={styles.recipeTitleTime}>
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <use href={`${sprite}#icon-cooktime`} />
            </svg>
            <span className={styles.yourSpan}>{time}</span>
          </div>
        )}
      </div>
      <div className={styles.recipeDescCal}>
        <p className={styles.recipeDescriptioncss}>{description}</p>

        <p className={styles.recipeDescriptioncss}> - {calories ?? "?"} cals</p>
      </div>
      <div className={styles.formButton}>
        <button
          className={styles.learnMoreButton}
          onClick={() => navigate(`/recipes/${_id}`)}
        >
          Learn More
        </button>
        <FavoriteButton recipeId={recipe._id} />
      </div>
    </div>
  );
};

export default RecipeCard;
