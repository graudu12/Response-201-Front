// RecipesList.jsx
import { forwardRef } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";
import Loading from "../Loading/Loading";

const RecipesList = forwardRef(
  ({ recipes, loading, mode, startIndex }, ref) => {
    /*if (loading) {
      return <Loading />;
    }*/

    if (!loading && recipes.length === 0) {
      return <p className={styles.noRecipesText}>No recipes found.</p>;
    }

    return (
      <div className={styles.recipeslist}>
        {recipes.map((recipe, index) => {
          const isFirstNew = startIndex !== null && index === startIndex;

          return (
            <RecipeCard
              key={recipe._id}
              ref={isFirstNew ? ref : null}
              recipe={recipe}
              mode={mode}
            />
          );
        })}
        {loading && <Loading />}
      </div>
    );
  }
);
RecipesList.displayName = "RecipesList";
export default RecipesList;
