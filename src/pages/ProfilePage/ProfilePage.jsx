import { useParams } from "react-router-dom";
import ProfileNavigation from "../../components/ProfileNavigation/ProfileNavigation";
import RecipesList from "../../components/RecipesList/RecipesList";
import LoadMoreBtn from "../../components/LoadMoreBtn/LoadMoreBtn";
// import Filters from "../../components/Filters/Filters"; // опціонально
import css from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { recipeType } = useParams(); // ⬅️ own або favorites

  return (
    <section className={css.profilePage}>
      <ProfileNavigation />

      {/* Якщо потрібен фільтр — розкоментуй */}
      {/* <Filters /> */}

      <RecipesList type={recipeType} />
      <LoadMoreBtn />
    </section>
  );
};

export default ProfilePage;
