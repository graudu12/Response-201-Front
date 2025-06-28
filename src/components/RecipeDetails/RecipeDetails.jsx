import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
// import {  addToFavorites,  removeFromFavorites,} from "../../redux/recipes/operations.js"; //  для Redux
import styles from "./RecipeDetails.module.css";
import Loader from "../Loading/Loading.jsx";

const RecipeDetails = ({ recipe }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth); // Проверка авторизации
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Проверка, есть ли рецепт в избранном (зависит от API)
  useEffect(() => {
    if (recipe && isAuthenticated) {
      // Запрос к API для проверки, например:
      // setIsFavorite(recipe.isFavorite);
    }
  }, [recipe, isAuthenticated]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      if (isFavorite) {
        await dispatch(removeFromFavorites(recipe.id)).unwrap();
        toast.success("Рецепт удалён из избранного");
      } else {
        await dispatch(addToFavorites(recipe.id)).unwrap();
        toast.success("Рецепт добавлен в избранное!");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast.error(error.message || "Ошибка при сохранении");
    } finally {
      setIsLoading(false);
    }
  };

  if (!recipe) return <div className={styles.notFound}>Рецепт не найден</div>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className={styles.image} />

      <section className={styles.section}>
        <h2>About recipe</h2>
        <p>{recipe.description}</p>
      </section>

      <section className={styles.section}>
        <h2>Ingredients</h2>
        <ul className={styles.ingredients}>
          {recipe.ingredients.map((item, index) => (
            <li key={index}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Preparation Steps</h2>
        <ol className={styles.steps}>
          {recipe.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </section>

      <section className={styles.info}>
        <h2>General information</h2>
        <p>
          <strong>Category:</strong> {recipe.category}
        </p>
        <p>
          <strong>Cooking time:</strong> {recipe.time} minutes
        </p>
        {recipe.calories && (
          <p>
            <strong>Calories:</strong> ~{recipe.calories} kcal
          </p>
        )}
      </section>

      <button
        onClick={handleFavoriteClick}
        disabled={isLoading}
        className={`${styles.favoriteButton} ${
          isFavorite ? styles.active : ""
        }`}
      >
        {isLoading ? (
          <Loader size="20px" />
        ) : isFavorite ? (
          "Remove from favorites"
        ) : (
          "Save to favorites"
        )}
      </button>
    </div>
  );
};

export default RecipeDetails;
