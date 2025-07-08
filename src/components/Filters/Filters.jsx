import { useState, useEffect } from "react";
import styles from "./Filters.module.css";
import axios from "axios";

const Filters = ({ onChange, totalItems, setIsFiltering }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredientOptions, setIngredientOptions] = useState([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://response-201-back.onrender.com/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  useEffect(() => {
    axios
      .get("https://response-201-back.onrender.com/api/ingredients")
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
    onChange({ category: selectedCategory, ingredient: selectedIngredient });
    const filterActive =
      selectedCategory.trim() !== "" || selectedIngredient.trim() !== "";
    setIsFiltering(filterActive);
  }, [selectedCategory, selectedIngredient, onChange, setIsFiltering]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedIngredient("");
  };
  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.mobTab}>
        <p className={`${styles.recipes}`}>{totalItems} recipes</p>
        <button
          className={`${styles.mobileToggleBtn} ${styles.mobileOnly}`}
          onClick={() => setIsMobileOpen(true)}
        >
          Filters
          <svg className={styles.filterIcon} width="24" height="24">
            <use href={`/svg/sprite.svg#icon-filter`} />
          </svg>
        </button>
      </div>

      {/* Дропдаун мобільний */}
      {isMobileOpen && (
        <div className={styles.mobileDropdown}>
          <button
            className={styles.closeBtn}
            onClick={() => setIsMobileOpen(false)}
          >
            <p className={styles.closeP}>Filters</p>

            <svg className={styles.iconClose} width="24" height="24">
              <use href={`/svg/sprite.svg#icon-close_modal`} />
            </svg>
          </button>

          <div className={styles.dropdownContent}>
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
                <option key={ingredient._id} value={ingredient.name}>
                  {ingredient.name}
                </option>
              ))}
            </select>

            <button
              onClick={handleResetFilters}
              className={styles.resetFilters}
            >
              Reset filters
            </button>
          </div>
        </div>
      )}
      <div className={`${styles.filters} ${styles.desktopOnly}`}>
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
              <option key={ingredient._id} value={ingredient.name}>
                {ingredient.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
