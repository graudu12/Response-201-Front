import styles from "./RecipeCard.module.css";
import sprite from "../../svg/sprite.svg";
import SaveFavoriteButton from "../SaveFavoriteButton/SaveFavoriteButton";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, mode }) => {
  const navigate = useNavigate();

  const {
    _id,
    dishPhoto,
    nameRecipe,
    recipeDescription,
    calories,
    cookingTime,
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
        {mode !== "own" && (
          <SaveFavoriteButton small mode={mode} recipeId={_id} />
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
