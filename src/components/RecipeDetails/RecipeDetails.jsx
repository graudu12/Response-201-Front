import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { addToFavorites, removeFromFavorites } from "../../redux/recipes/operations.js";
import styles from "./RecipeDetails.module.css";
import Loading from "../Loading/Loading.jsx";
import sprite from "../../svg/sprite.svg";

const RecipeDetails = ({ recipe }) => {
  console.log("🧪 Получен recipe в компоненте:", recipe);

  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (recipe && isAuthenticated) {
      // Например:
      // setIsFavorite(recipe.isFavorite);
    }
  }, [recipe, isAuthenticated]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
  };

  if (!recipe) {
    return <div className={styles.notFound}>Рецепт не найден</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>{recipe.title}</h1>
        <img src={recipe.thumb} alt={recipe.title} className={styles.image} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <h2>About recipe</h2>
            <p>{recipe.description}</p>
          </section>

          <section className={styles.section}>
            <h2>Ingredients</h2>
            {recipe.ingredients?.length > 0 ? (
              <ul className={styles.ingredients}>
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>
                    Ingredient ID: <code>{item.id}</code> — {item.measure}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No ingredients found.</p>
            )}
          </section>

          <section className={styles.section}>
            <h2>Preparation Steps</h2>
            {recipe.instructions ? (
              <ol className={styles.steps}>
                {recipe.instructions.split(". ").map((step, index) => (
                  <li key={index}>{step.trim()}</li>
                ))}
              </ol>
            ) : (
              <p>Instructions not available.</p>
            )}
          </section>
        </div>

        <div className={styles.infoBox}>
          <section className={styles.info}>
            <h2 className={styles.infoTitle}>General information</h2>
            <p>
              <strong>Category:</strong> {recipe.category || "—"}
            </p>
            <p>
              <strong>Cooking time:</strong> {recipe.time || "—"} minutes
            </p>

            <p>
              <strong>Caloric content:</strong> Approximately ~
              {recipe.calories || ""} kcal per serving
            </p>
          </section>

          <button
            onClick={handleFavoriteClick}
            disabled={isLoading}
            className={`${styles.favoriteButton} ${
              isFavorite ? styles.active : ""
            }`}
          >
            {isLoading ? (
              <Loading size="20px" />
            ) : (
              <>
                <svg
                  className={`${styles.icon} ${
                    isFavorite ? styles.iconFilled : styles.iconOutline
                  }`}
                  width="24"
                  height="24"
                >
                  <use href={`${sprite}#icon-saved`} />
                </svg>
                {isFavorite ? "Remove from favorites" : "Save"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
