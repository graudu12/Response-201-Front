import css from "./Layout.module.css";
import { Suspense } from "react";

import Header from "../Header/Header";
import RecipeDetails from "../RecipeDetails/RecipeDetails";

export const Layout = ({ children }) => {
  return (
    <div className={css.container}>
      <Header />
      <Suspense fallback={null}>{children}</Suspense>
      <RecipeDetails />
    </div>
  );
};
