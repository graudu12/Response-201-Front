// RecipesList.jsx
import { forwardRef } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";
import Loading from "../Loading/Loading";

const RecipesList = forwardRef(({ recipes, loading, mode }, ref) => {
  if (loading) {
    return <Loading />;
  }

  if (!loading && recipes.length === 0) {
    return <p className={styles.noRecipesText}>No recipes found.</p>;
  }

  return (
    <div className={styles.recipeslist} ref={ref}>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe._id} recipe={recipe} mode={mode} />
      ))}
    </div>
  );
});
RecipesList.displayName = "RecipesList";
export default RecipesList;
