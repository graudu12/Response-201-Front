import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import styles from "./RecipesList.module.css";
import {
  fetchRecipes,
  toggleFavoriteRecipeAsync,
} from "../../redux/recipes/operations";
import axios from "axios";

const RecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.items);
  const totalItems = useSelector((state) => state.recipes.totalItems);

  const [page, setPage] = useState(1);
  const recipesPerPage = 12;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredientOptions, setIngredientOptions] = useState([]);

  const recipesListRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/ingredients")
      .then((res) => {
        if (Array.isArray(res.data.ingredients)) {
          setIngredientOptions(res.data.ingredients);
        } else {
          console.error("Expected an array of ingredients but got:", res.data);
          setIngredientOptions([]);
        }
      })
      .catch((err) => {
        console.error("Error loading ingredients:", err);
        setIngredientOptions([]);
      });
  }, []);

  useEffect(() => {
    dispatch(
      fetchRecipes({
        page,
        perPage: recipesPerPage,
        category: selectedCategory,
        ingredient: selectedIngredient,
      })
    );
  }, [dispatch, page, selectedCategory, selectedIngredient]);

  useEffect(() => {
    setPage(1); // повертаємо на першу сторінку при зміні фільтрів
  }, [selectedCategory, selectedIngredient]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedIngredient("");
  };

  const handleToggleFavorite = (id, add) => {
    dispatch(toggleFavoriteRecipeAsync({ id, add }));
  };

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };
  useEffect(() => {
    if (page > 1 && recipesListRef.current) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          const list = recipesListRef.current;
          // Знаходимо останній елемент в списку
          const lastRecipe = list.children[list.children.length - 1];
          if (lastRecipe) {
            lastRecipe.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        });
      }, 200);
    }
  }, [page]);
  const recipesToShow = recipes.slice(0, page * recipesPerPage);
  return (
    <div className={styles.recipeListContainer}>
      <div className={styles.FormRecipes}>
        <h2 className={styles.Recipes}>Recipes</h2>
      </div>
      <div className={styles.filters}>
        <p className={styles.recipes}>{totalItems} recipes</p>
        <div className={styles.inputWithIcon}>
          <div className={styles.buttonReset}>
            <button
              onClick={handleResetFilters}
              className={styles.resetFilters}
            >
              Reset filters
            </button>
          </div>
          <select
            className={styles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className={styles.filterSelect}
            value={selectedIngredient}
            onChange={(e) => setSelectedIngredient(e.target.value)}
          >
            <option value="">Ingredient</option>
            {ingredientOptions.map((ingredient) => (
              <option key={ingredient} value={ingredient}>
                {ingredient}
              </option>
            ))}
          </select>
        </div>
      </div>
      {recipes.length === 0 && <p>No recipes found.</p>}

      <div className={styles.recipeslist} ref={recipesListRef}>
        {recipesToShow.map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
      <div className={styles.BtnLoadWrapper}>
        <div className={styles.BtnLoad}>
          {page * recipesPerPage < totalItems && (
            <LoadMoreBtn onClick={loadMore}>Load More</LoadMoreBtn>
          )}
        </div>
      </div>
    </div>
  );
};
export default RecipesList;
