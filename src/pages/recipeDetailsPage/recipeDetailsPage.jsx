import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/recipes/operations"; // получаем ВСЕ рецепты
import RecipeDetails from "../../components/RecipeDetails/RecipeDetails";
import Loader from "../../components/Loading/Loading";

export default function RecipeDetailsPage() {
  const { recipeId } = useParams();
  const dispatch = useDispatch();

  const { items, loading, error } = useSelector((state) => state.recipes);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchRecipes()); // загружаем все рецепты, если ещё не загружены
    }
  }, [dispatch, items.length]);

  const recipe = useMemo(() => {
    return items.find((r) => r._id === recipeId);
  }, [items, recipeId]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return <RecipeDetails recipe={recipe} />;
}
