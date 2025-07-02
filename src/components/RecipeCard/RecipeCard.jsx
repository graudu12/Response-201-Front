import styles from "./RecipeCard.module.css";
import sprite from "../../svg/sprite.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { selectIsLoggedIn } from '../../redux/auth/selectors';

const RecipeCard = ({ recipe, onToggleFavorite }) => {
  const { _id, dishPhoto, nameRecipe, recipeDescription, calories, isFavorite, cookingTime } = recipe;

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
      <img src={dishPhoto} alt={nameRecipe} className={styles.imageCard} />
      <div className={styles.recipeForm}>
        <h3 className={styles.recipeTitle}>{nameRecipe}</h3>
        {cookingTime  && (
          <div className={styles.recipeTitleTime}>
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <use href={`${sprite}#icon-cooktime`} />
            </svg>
            <span className={styles.yourSpan}>{cookingTime }</span>
          </div>
        )}
      </div>
      <div className={styles.recipeDescCal}>
        <p className={styles.descriptioncss}>{recipeDescription}</p>

        <p className={styles.descriptioncss}> - {calories  ?? "?"} cals</p>
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
            viewBox="0 0 24 24"
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
