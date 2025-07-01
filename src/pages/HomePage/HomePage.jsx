import css from "../HomePage/HomePage.module.css";
import Hero from "../../components/Hero/Hero";
import RecipesList from "../../components/RecipesList/RecipesList";

export default function HomePage() {
  return (
    <div className={css.homePage}>
      <Hero />
      <RecipesList />
    </div>
  );
}
