import { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./RecipeDetails.module.css";
import SaveFavoriteButton from "../SaveFavoriteButton/SaveFavoriteButton.jsx";

const RecipeDetails = ({ recipe }) => {
  console.log("🧪 Получен recipe в компоненте:", recipe);

  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (recipe && isAuthenticated) {
      // Например:
      // setIsFavorite(recipe.isFavorite);
    }
  }, [recipe, isAuthenticated]);

  if (!recipe) {
    return <div className={styles.notFound}>Рецепт не найден</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerSection}>
        <h1 className={styles.title}>{recipe.nameRecipe}</h1>
        <img
          src={recipe.dishPhoto}
          alt={recipe.nameRecipe}
          className={styles.image}
        />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <h2>About recipe</h2>
            <p>{recipe.recipeDescription}</p>
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
              <strong>Category:</strong> {recipe.recipeCategory || "—"}
            </p>
            <p>
              <strong>Cooking time:</strong> {recipe.cookingTime || "—"} minutes
            </p>

            <p>
              <strong>Caloric content:</strong> Approximately ~
              {recipe.calories || ""} kcal per serving
            </p>
          </section>
          <SaveFavoriteButton recipeId={recipe._id} />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
