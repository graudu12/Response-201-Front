import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import {
  toggleFavoriteRecipe,
  setRecipes,
} from "../../redux/recipesSlice/recipesSlice";
import styles from "./RecipesList.module.css";

// Временная функция загрузки рецептов
const fetchRecipesFromServer = async () => {
  return [
    {
      id: 1,
      title: "Pasta",
      description: "Delicious Italian pasta",
      image: "/image/postcard-8755004_640.webp",
      calories: 450,
      isFavorite: false,
      category: "Dinner",
    },
    {
      id: 2,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
    {
      id: 3,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
    {
      id: 4,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
    {
      id: 5,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
    {
      id: 6,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
    {
      id: 7,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
    {
      id: 8,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
    {
      id: 9,
      title: "Salad",
      description: "Healthy green salad",
      image: "/image/postcard-8755004_640.webp",
      calories: 200,
      isFavorite: false,
      category: "Lunch",
    },
  ];
};

const RecipesList = () => {
  const dispatch = useDispatch();
  const [filteredRecipes, setFilteredRecipes] = useState([]); // Отфильтрованные рецепты
  const [visibleCount, setVisibleCount] = useState(12);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const originalRecipes = useSelector((state) => state.recipes.items);

  const handleResetFilters = () => {
    setFilteredRecipes(originalRecipes); // Возврат к полному списку
    setVisibleCount(12);
    setSelectedCategory("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
    const filtered = originalRecipes.filter((r) => r.category === category);
    setFilteredRecipes(filtered);
    setVisibleCount(12);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleToggleFavorite = (id, add) => {
    dispatch(toggleFavoriteRecipe({ id, add })); // в диспатч toggleFavoriteRecipe //
  };

  useEffect(() => {
    // Пример загрузки
    fetchRecipesFromServer().then((data) => {
      dispatch(setRecipes(data));
      setFilteredRecipes(data);
    });
  }, [dispatch]);

  return (
    <div className={styles.recipeListContainer}>
      <div className={styles.FormRecipes}>
        <h2 className={styles.Recipes}>Recipes</h2>
      </div>
      <div className={styles.filters}>
        <p className={styles.recipes}>{filteredRecipes.length} recipes</p>

        <div className={styles.inputWithIcon}>
          <div className={styles.buttonReset}>
            <button
              onClick={handleResetFilters}
              className={styles.resetFilters}
            >
              Reset filters
            </button>
          </div>

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={selectedCategory}
            className={styles.filterInput}
            readOnly
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          />
          <span className={styles.icon}>▼</span>

          {/* <img alt="Expand" className={styles.icon} /> должна иконка присутствовать */}

          {showCategoryDropdown && (
            <ul className={styles.dropdown}>
              {["Dinner", "Lunch", "Breakfast", "Snack"].map((cat) => (
                <li
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={styles.dropdownItem}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.inputWithIcon}>
          <input
            type="text"
            name="Ingredient"
            placeholder="Ingredient"
            className={styles.filterInput}
            readOnly
          />
          <span className={styles.icon}>▼</span>

          {/* <img alt="Expand" className={styles.icon} /> должна иконка присутствовать */}
        </div>
      </div>

      {filteredRecipes.length === 0 && <p>No recipes found.</p>}

      <div className={styles.recipeGrid}>
        {filteredRecipes.slice(0, visibleCount).map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      {visibleCount < filteredRecipes.length && (
        <button onClick={loadMore} className={styles.loadMore}>
          Load More
        </button>
      )}
    </div>
  );
};

export default RecipesList;
