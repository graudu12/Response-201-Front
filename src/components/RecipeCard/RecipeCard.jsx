import styles from "./RecipeCard.module.css";
import sprite from "../../svg/sprite.svg";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const {
    _id,
    dishPhoto = recipe.thumb,
    nameRecipe = recipe.title,
    recipeDescription = recipe.description,
    calories,
    cookingTime = recipe.time,
  } = recipe;

  return (
    <div className={styles.recipeCard}>
      <img src={dishPhoto} alt={nameRecipe} className={styles.imageCard} />
      <div className={styles.recipeForm}>
        <h3 className={styles.recipeTitle}>{nameRecipe}</h3>
        {cookingTime && (
          <div className={styles.recipeTitleTime}>
            <svg
              className={styles.icon}
              width="24"
              height="24"
              viewBox="0 0 32 32"
            >
              <use href={`${sprite}#icon-cooktime`} />
            </svg>
            <span className={styles.yourSpan}>{cookingTime}</span>
          </div>
        )}
      </div>
      <div className={styles.recipeDescCal}>
        <p className={styles.descriptioncss}>{recipeDescription}</p>
        <p className={styles.descriptioncss}> - {calories ?? "?"} cals</p>
      </div>
      <div className={styles.formButton}>
        <button
          className={styles.learnMoreButton}
          onClick={() => navigate(`/recipes/${_id}`)}
        >
          Learn More
        </button>
        {isLoggedIn && <FavoriteButton recipeId={_id} />}
      </div>
    </div>
  );
};

export default RecipeCard;

