import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import RecipeCard from "../RecipeCard/RecipeCard";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import styles from "./RecipesList.module.css";
import sprite from "../../svg/sprite.svg";
import {
  fetchRecipes,
  toggleFavoriteRecipeAsync,
} from "../../redux/recipes/operations";
import axios from "axios";

const RecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.items);
  const totalItems = useSelector((state) => state.recipes.totalItems);

  const categoryDropdownRef = useRef(null);
  const ingredientDropdownRef = useRef(null);

  const [page, setPage] = useState(1);
  const recipesPerPage = 12;

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showIngredientDropdown, setShowIngredientDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [categories, setCategories] = useState([]);

  const ingredientOptions = [
    "Tomato",
    "Cheese",
    "Chicken",
    "Beef",
    "Onion",
    "Garlic",
    "Carrot",
  ];
  const recipesListRef = useRef(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error loading categories:", err));
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

  useEffect(() => {
    setPage(1); // повертаємо на першу сторінку при зміні фільтрів
  }, [selectedCategory, selectedIngredient]);

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
                  className={styles.icon}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <use href={`${sprite}#icon-select_arrow`} />
                </svg>
              </span>
            </div>

            {showCategoryDropdown && (
              <ul className={styles.dropdown}>
                {categories.length === 0 ? (
                  <li className={styles.dropdownItem}>No categories</li>
                ) : (
                  categories.map((cat) => (
                    <li
                      key={cat._id}
                      onClick={() => handleCategorySelect(cat.name)}
                      className={styles.dropdownItem}
                    >
                      {cat.name}
                    </li>
                  ))
                )}
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
                  className={styles.icon}
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <use href={`${sprite}#icon-select_arrow`} />
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
          </div>
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
