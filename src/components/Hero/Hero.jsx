import css from "./Hero.module.css";
import SearchBox from "../SearchBox/SearchBox";

export default function Hero({ setIsFiltering }) {
  return (
    <section className={css.hero}>
      <div className={css.heroContainer}>
        <div className={css.content}>
          <h1 className={css.title}>
            Plan, Cook, and <br />
            Share Your Flavors
          </h1>
          <SearchBox setIsFiltering={setIsFiltering} />
        </div>
      </div>
    </section>
  );
}
