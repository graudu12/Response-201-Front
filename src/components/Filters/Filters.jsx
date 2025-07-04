import { useState, useEffect } from "react";
import styles from "./Filters.module.css";
import axios from "axios";

const Filters = ({ onChange, totalItems }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [categories, setCategories] = useState([]);
  const [ingredientOptions, setIngredientOptions] = useState([]);

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
  }, [selectedCategory, selectedIngredient, onChange]);

  const handleResetFilters = () => {
    setSelectedCategory("");
    setSelectedIngredient("");
  };
  return (
    <div className={styles.filters}>
      <p className={styles.recipes}>{totalItems} recipes</p>
      <div className={styles.inputWithIcon}>
        <div className={styles.buttonReset}>
          <button onClick={handleResetFilters} className={styles.resetFilters}>
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
  );
};

export default Filters;
