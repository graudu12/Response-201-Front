import css from "../HomePage/HomePage.module.css";
import SearchBox from "../../components/SearchBox/SearchBox";

export default function HomePage() {
  return (
    <div className={css.homePage}>
      <h1 className={css.title}>Task manager welcome page ⭐</h1>
      <SearchBox />
    </div>
  );
}
