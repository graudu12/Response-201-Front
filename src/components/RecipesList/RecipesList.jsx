import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import styles from "./RecipesList.module.css";

import {
  fetchRecipes,
  toggleFavoriteRecipeAsync,
} from "../../redux/recipesSlice/recipesSlice";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

const RecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.items);

  const categoryDropdownRef = useRef(null);
  const ingredientDropdownRef = useRef(null);

  // Фильтры и отображаемые элементы
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [visibleCount, setVisibleCount] = useState(12);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");

  const ingredientOptions = [
    "Tomato",
    "Cheese",
    "Chicken",
    "Beef",
    "Onion",
    "Garlic",
    "Carrot",
  ];

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setShowCategoryDropdown(false);
      }
      if (
        ingredientDropdownRef.current &&
        !ingredientDropdownRef.current.contains(event.target)
      ) {
        setShowIngredientDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedIngredient("");
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  const handleIngredientSelect = (ingredient) => {
    setSelectedIngredient(ingredient);
    setShowIngredientDropdown(false);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const handleToggleFavorite = (id, add) => {
    dispatch(toggleFavoriteRecipeAsync({ id, add }));
  };

  useEffect(() => {
    let filtered = recipes;

    if (selectedCategory) {
      filtered = filtered.filter((r) => r.category === selectedCategory);
    }
    if (selectedIngredient.trim() !== "") {
      filtered = filtered.filter((r) =>
        // Если у рецепта есть поле ingredients (массив), ищем в нем
        r.ingredients
          ? r.ingredients.some((ing) =>
              ing.toLowerCase().includes(selectedIngredient.toLowerCase())
            )
          : // иначе ищем по description как было
            r.description
              .toLowerCase()
              .includes(selectedIngredient.toLowerCase())
      );
    }

    setFilteredRecipes(filtered);
    setVisibleCount(12);
  }, [recipes, selectedCategory, selectedIngredient]);

  return (
    <div className={styles.recipeListContainer}>
      <div className={styles.FormRecipes}>
        <h2 className={styles.Recipes}>Recipes</h2>
      </div>
      <div className={styles.filters}>
        <p className={styles.recipes}>{filteredRecipes.length} recipes</p>
      </div>
      <div className={styles.inputWithIcon}>
        <div className={styles.buttonReset}>
          <button onClick={handleResetFilters} className={styles.resetFilters}>
            Reset filters
          </button>
        </div>
        <div className={styles.FormButton} ref={categoryDropdownRef}>
          <div
            className={styles.ButtonInput}
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
          >
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={selectedCategory}
              className={styles.filterInput}
              readOnly
              tabIndex={-1}
              onFocus={(e) => e.target.blur()}
            />
            <span style={{ marginLeft: 5 }}>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            {/* <img alt="Expand" className={styles.icon} /> должна иконка присутствовать */}
          </div>

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
        <div className={styles.FormButton} ref={ingredientDropdownRef}>
          <div
            className={styles.ButtonInput}
            onClick={() => setShowIngredientDropdown(!showIngredientDropdown)}
          >
            <input
              type="text"
              name="Ingredient"
              placeholder="Ingredient"
              className={styles.filterInput}
              value={selectedIngredient}
              readOnly
            />
            <span style={{ marginLeft: 5 }}>
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="black"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
          {showIngredientDropdown && (
            <ul className={styles.dropdown}>
              {ingredientOptions.map((ing) => (
                <li
                  key={ing}
                  onClick={() => handleIngredientSelect(ing)}
                  className={styles.dropdownItem}
                >
                  {ing}
                </li>
              ))}
            </ul>
          )}
          {/* <img alt="Expand" className={styles.icon} /> должна иконка присутствовать */}
        </div>
      </div>

      {filteredRecipes.length === 0 && <p>No recipes found.</p>}

      <div className={styles.recipeslist}>
        {filteredRecipes.slice(0, visibleCount).map((recipe) => (
          <RecipeCard
            key={recipe._id}
            recipe={recipe}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
      <div className={styles.BtnLoadWrapper}>
        <div className={styles.BtnLoad}>
          {visibleCount < filteredRecipes.length && (
            <LoadMoreBtn onClick={loadMore}>Load More</LoadMoreBtn>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesList;
